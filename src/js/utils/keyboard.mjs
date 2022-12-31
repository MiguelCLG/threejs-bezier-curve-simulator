/*
    efolioB - Curvas de Bézier  
    Miguel Gonçalves 1901337 - 10/01/2023
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
    document.body.addEventListener(
      "keyup",
      (e) => delete this.canPress[e.code]
    );

    // evento para quando a tecla é premida
    document.body.addEventListener("keydown", (e) =>
      this.handleKeyboardInput(e.code)
    );
  }

  handleKeyboardInput(key)
  {
    this.canPress[key] = true;
    const { state } = this.singleton;
    switch (key)
    {
      case "Digit1":
        state.setSelectedPoint("c0")
        break;
      case "Digit2": 
        state.setSelectedPoint("c1")
        break;
      case "Digit3": 
        state.setSelectedPoint("c2")
        break;
      case "Digit4": 
        state.setSelectedPoint("c3")
        break;
      case "Digit5": 
        state.setSelectedPoint("c4")
        break;
      case "Space":
        const { x, y, z } = this.getRaycastPosition();
        this.singleton.state.setPointPosition({ x, y, z })
        break;
      case "Backspace": break;
      case "KeyW": break;
      case "KeyS": break;
      case "KeyX": break;
      default: break;
    }
  }

  getRaycastPosition() {
    // "dispara" um raio entre a posição da camera relativa ao ponteiro do rato
    this.raycaster.setFromCamera(this.pointer, this.camera.perspectiveCamera);

    // obtém os objectos interceptados
    const intersects = this.raycaster.intersectObjects(this.scene.children);

    return intersects[0].point;

    // // dá update à informação
    // this.information.updateData({
    //   lastClicked: `(${Math.round(x)}, ${Math.round(y)})`,
    // });
  }
}
