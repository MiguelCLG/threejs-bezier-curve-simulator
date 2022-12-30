/*
    efolioB - Curvas de Bézier  
    Miguel Gonçalves 1901337 - 10/01/2023
*/

import { EventEmitter } from "https://unpkg.com/@dekkai/event-emitter";
/**
 * @class Tempo
 * Esta class vai armazenar o tempo elapsed, vai permitir que tenhamos apenas um requestAnimationFrame().
 * @extends {EventEmitter} class do node que nos permite emitir eventos, por sua vez,
 * permite escutar estes eventos noutra class para dar trigger a funcionalidades específicas.
 *
 */
export default class Tempo extends EventEmitter {
  constructor() {
    super();
    this.startTime = Date.now();
    this.current = this.startTime;
    this.elapsedTime = 0;
    this.deltaTime = 16;

    this.update();
  }

  update() {
    const currentTime = Date.now();
    this.deltaTime = currentTime - this.current;
    this.current = currentTime;
    this.elapsedTime = this.current - this.startTime;

    if (this.elapsedTime > this.deltaTime) {
      // update a cada 16ms
      this.emit("update"); // emissão do update, todos os components que estejam à escuta deste emit vão fazer update (neste caso será o singleton)
      // reseta o temporizador
      this.elapsedTime = 0;
      this.startTime = Date.now();
    }
    window.requestAnimationFrame(() => this.update());
  }
}
