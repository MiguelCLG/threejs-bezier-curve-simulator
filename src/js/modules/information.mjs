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
      lastClicked: "N/A",
      lastCalculation: "N/A",
      selectedTiles: "N/A",
    };
    this.assignInfoBox();
  }

  assignInfoBox() {
    this.lastClickedText = document.querySelector(".last-clicked-text");
    this.lastClickedText.nodeValue = `Last Clicked: ${this.informationData.lastClicked}`;
    this.lastCalculationText = document.querySelector(".last-calculation-text");
    this.lastCalculationText.innerText = `Last Calculation: ${this.informationData.lastCalculation}`;
    this.selectedTiles = document.querySelector(".selected-tiles");
    this.selectedTiles.innerText = `Selected Tiles: ${this.informationData.lastCalculation}`;
  }

  updateData(infoData) {
    this.informationData = {
      lastClicked: infoData.lastClicked || this.informationData.lastClicked,
      lastCalculation:
        infoData.lastCalculation || this.informationData.lastCalculation,
      selectedTiles:
        infoData.selectedTiles || this.informationData.selectedTiles,
    };
  }

  updateInformation() {
    this.lastClickedText.innerText = `Last Clicked: ${this.informationData.lastClicked}`;
    this.selectedTiles.innerText = `Selected Tiles: ${this.informationData.selectedTiles}`;
    this.lastCalculationText.innerText = `Last Calculation: ${this.informationData.lastCalculation}`;
  }

  update() {
    this.updateInformation();
  }
}
