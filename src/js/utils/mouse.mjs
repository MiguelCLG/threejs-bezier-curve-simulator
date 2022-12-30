/*
    efolioB - Curvas de Bézier  
    Miguel Gonçalves 1901337 - 10/01/2023
*/

import * as THREE from "https://unpkg.com/three@0.124.0/build/three.module.js";
import { EventEmitter } from "https://unpkg.com/@dekkai/event-emitter";
import Singleton from "../modules/singleton.mjs";

/**
 * @export
 * @class Mouse
 * @extends {EventEmitter}
 * Gere a posição do rato num vector para ser acedido sempre que necessário
 */
export default class Mouse extends EventEmitter {
  constructor() {
    super();
    this.singleton = new Singleton();
    this.scene = this.singleton.scene;

    this.pointer = new THREE.Vector2();
    document.body.addEventListener("pointermove", (e) => this.onPointerMove(e));
  }

  onPointerMove(evento) {
    // calcula a posição do pointer em coordenadas normalizadas
    this.pointer.setX((evento.clientX / window.innerWidth) * 2 - 1);
    this.pointer.setY(-(evento.clientY / window.innerHeight) * 2 + 1);
  }
}
