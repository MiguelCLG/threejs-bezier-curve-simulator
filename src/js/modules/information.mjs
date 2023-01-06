/*
    efolioB - Curvas de Bézier  
    Miguel Gonçalves 1901337 - 10/01/2023
*/

import Singleton from "./singleton.mjs";

/**
 *
 * @export
 * @class Information
 * Atualiza a informação que damos display no painel
 */
export default class Information {
  constructor() {
    this.singleton = new Singleton();
    this.informationData = {
      point: "N/A",
      coordenates: "N/A",
    };
    this.assignInfoBox();
  }

  assignInfoBox() {
    this.point = document.querySelector(".point");
    this.point.nodeValue = `Nome do Ponto: ${this.informationData.point}`;
    this.coordenates = document.querySelector(".coordenates");
    this.coordenates.innerText = `Coordenadas: ${this.informationData.coordenates}`;
    this.keyPressed = document.querySelector(".button-clicked");
  }

  updateData(infoData) {
    this.informationData = {
      point: infoData.point || this.informationData.point,
      coordenates:
        infoData.coordenates || this.informationData.coordenates,
    };
  }

  updateInformation() {
    this.point.innerText = `Nome do Ponto: ${this.informationData.point}`;
    this.coordenates.innerText = `Coordenadas: ${this.informationData.coordenates}`;
  }

  updatePressedKey(key){
    this.keyPressed.style.opacity = 0.5;
    this.keyPressed.innerText= key;
  }

  update() {
    this.updateInformation();
  }
}
