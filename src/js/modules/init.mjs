/*
    efolioB - Curvas de Bézier  
    Miguel Gonçalves 1901337 - 10/01/2023
*/

import Singleton from "./singleton.mjs";

/**
 * Initializa o primeiro componente da aplicação
 */
function Initialize() {
  const canvas = document.querySelector(".main-canvas");
  const mainApp = new Singleton(canvas);
}

export default Initialize;