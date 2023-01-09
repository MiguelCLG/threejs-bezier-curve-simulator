/*
    efolioB - Curvas de Bézier  
    Miguel Gonçalves 1901337 - 09/01/2023
*/

import * as THREE from "https://unpkg.com/three@0.124.0/build/three.module.js";
import Singleton from "../modules/singleton.mjs";

/**
 *
 * @export
 * @class Keyboard
 * Controla as teclas premidas no teclado e as suas funcionalidades
 */
export default class Keyboard {
  constructor() {
    this.canPress = {}; // estrutura para armazenar teclas premidas e remover quando são soltas

    this.singleton = new Singleton();
    this.scene = this.singleton.scene;
    this.camera = this.singleton.camera;
    this.mouse = this.singleton.mouse;
    this.pointer = this.mouse.pointer;
    this.raycaster = new THREE.Raycaster();
    this.information = this.singleton.information;

    // evento para quando a tecla é solta
    document.body.addEventListener("keyup", (e) => {
      delete this.canPress[e.code];
      if (e.code === "KeyW" || e.code === "KeyS") {
        this.singleton.state.resetTimer();
      }
    });

    // evento para quando a tecla é premida
    document.body.addEventListener("keydown", (e) =>
      this.handleKeyboardInput(e.code)
    );
  }

  handleKeyboardInput(key) {
    // Se a tecla estiver continuamente a ser premida retorna para que não haja side effects
    // No entanto mais abaixo removemos a tecla caso seja W ou S, pois aí a nossa intenção é que seja continuamente premida
    if (this.canPress[key]) return;
    this.canPress[key] = true;

    // vamos buscar o state ao singleton que contém todas as funcionalidades que pretendemos utilizar
    const { state } = this.singleton;

    switch (key) {
      case "Digit1":
        if (state.selectedPoint !== null && state.selectedPoint.name === "c0")
          state.unselectPoint(state.selectedPoint);
        else {
          state.setSelectedPoint("c0");
          this.information.updatePressedKey("1");
        }
        break;
      case "Digit2":
        if (state.selectedPoint !== null && state.selectedPoint.name === "c1")
          state.unselectPoint(state.selectedPoint);
        else {
          state.setSelectedPoint("c1");
          this.information.updatePressedKey("2");
        }
        break;
      case "Digit3":
        if (state.selectedPoint !== null && state.selectedPoint.name === "c2")
          state.unselectPoint(state.selectedPoint);
        else {
          state.setSelectedPoint("c2");
          this.information.updatePressedKey("3");
        }
        break;
      case "Digit4":
        if (state.selectedPoint !== null && state.selectedPoint.name === "c3")
          state.unselectPoint(state.selectedPoint);
        else {
          state.setSelectedPoint("c3");
          this.information.updatePressedKey("4");
        }
        break;
      case "Digit5":
        if (state.selectedPoint !== null && state.selectedPoint.name === "c4")
          state.unselectPoint(state.selectedPoint);
        else {
          state.setSelectedPoint("c4");
          this.information.updatePressedKey("5");
        }
        break;
      case "Space":
        const { x, y, z } = this.getRaycastPosition();
        if (!x || !y || !z) return;
        this.singleton.state.setPointPosition({ x, y, z });
        this.information.updatePressedKey("SP");
        break;
      case "Backspace":
        this.singleton.state.reset();
        this.information.updatePressedKey("BS");
        break;
      case "KeyW":
        this.singleton.state.movePointUpwards();
        delete this.canPress[key];
        this.information.updatePressedKey("W");
        break;
      case "KeyS":
        this.singleton.state.movePointDownwards();
        delete this.canPress[key];
        this.information.updatePressedKey("S");
        break;
      case "KeyX":
        this.singleton.state.createBezier();
        this.information.updatePressedKey("X");
        break;
      default:
        break;
    }
  }

  getRaycastPosition() {
    // "dispara" um raio entre a posição da camera relativa ao ponteiro do rato
    this.raycaster.setFromCamera(this.pointer, this.camera.perspectiveCamera);

    // obtém os objectos interceptados
    const intersects = this.raycaster.intersectObjects(this.scene.children);

    if (intersects.length == 0)
      return { x: undefined, y: undefined, z: undefined };

    return intersects[0].point;
  }
}
