/*
    efolioB - Curvas de Bézier  
    Miguel Gonçalves 1901337 - 09/01/2023
*/

import * as THREE from "https://unpkg.com/three@0.124.0/build/three.module.js";
import { EventEmitter } from "https://unpkg.com/@dekkai/event-emitter";
import Singleton from "../modules/singleton.mjs";

/**
 * @export
 * @class Mouse
 * @extends {EventEmitter}
 * Gere a posição do rato num vector para ser acedido sempre que necessário
 * Gere também as funcionalidades do Rato (Mouse click)
 */
export default class Mouse extends EventEmitter {
  constructor() {
    super();
    this.singleton = new Singleton();
    this.scene = this.singleton.scene;
    this.camera = this.singleton.camera;

    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();

    // Evento para a posição do ponteiro
    document.body.addEventListener("pointermove", (e) => this.onPointerMove(e));
    // Evento para a quando o rato é clicado
    document.body.addEventListener("pointerdown", (e) =>
      this.onPointerClick(e.button)
    );
  }

  onPointerMove(evento) {
    // calcula a posição do pointer em coordenadas normalizadas
    this.pointer.setX((evento.clientX / window.innerWidth) * 2 - 1);
    this.pointer.setY(-(evento.clientY / window.innerHeight) * 2 + 1);
  }

  onPointerClick(mouseButton) {
    if (mouseButton != 0 || this.singleton.state.selectedPoint === null) return;

    // vai buscar a posição do rato com um raycast
    const { x, y } = this.getRaycastPosition();

    //caso estes sejam undefined, retorna
    if (!x || !y) return;

    // como queremos manter a posição do eixo dos Z, usamos a posição que temos guardada em estado
    this.singleton.state.setPointPosition({
      x,
      y,
      z: this.singleton.state.getPointPosition().z,
    });

    // dá update à informação
    this.singleton.information.updatePressedKey("MC");
  }

  getRaycastPosition() {
    // "dispara" um raio entre a posição da camera relativa ao ponteiro do rato
    this.raycaster.setFromCamera(this.pointer, this.camera.perspectiveCamera);

    // obtém os objectos interceptados
    const intersects = this.raycaster.intersectObjects(this.scene.children);

    // caso não haja interceções, retorna undefined para cada um dos seus elementos de vector
    if (intersects.length == 0)
      return { x: undefined, y: undefined, z: undefined };

    return intersects[0].point;
  }
}
