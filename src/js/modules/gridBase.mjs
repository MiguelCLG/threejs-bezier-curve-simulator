/*
    efolioB - Curvas de Bézier  
    Miguel Gonçalves 1901337 - 10/01/2023
*/

import Singleton from "./singleton.mjs";
import GridTile from "./gridTile.mjs";

/**
 *
 * @export
 * @class Grid
 * Gere a grelha em que vamos usar o algoritmo do ponto medio
 */
export default class GridBase {
  tileColor1 = 0xef9a70;
  tileColor2 = 0x9a92bf;

  constructor(size = 10) {
    this.singleton = new Singleton();
    this.size = size;
    this.scene = this.singleton.scene;
    this.tiles = [];
    this.reset();

    // adiciono um event listener para o click do botao Reset para alterar o tamanho da grid
    const botaoReset = document.getElementById("change-grid-btn");
    botaoReset.addEventListener("click", () =>
      this.changeGridSize(document.getElementById("size-input").value)
    );
  }

  // Cria a estrutura da grelha
  createGrid(size, cor1, cor2) {
    const tiles = [];
    for (let x = -size; x <= size; x++) {
      for (let y = -size; y <= size; y++) {
        // queremos cores diferentes para cada bloco alternado, então verificamos os pares e construímos o tile de acordo com o resultado
        if ((x % 2 === 0 && y % 2 === 0) || (x % 2 !== 0 && y % 2 !== 0))
          tiles.push(new GridTile(1, { x, y, z: 0 }, cor1));
        else tiles.push(new GridTile(1, { x, y, z: 0 }, cor2));
      }
    }
    return tiles;
  }
  // dá reset à estrutura de dados e à grelha
  // se clearRasterized é true, então limpa também os tiles rasterizados
  reset() {
    this.tiles.forEach(({ tile }) => this.scene.remove(tile));
    this.tiles = this.createGrid(this.size, this.tileColor1, this.tileColor2);
    this.tiles.forEach(({ tile }) => {
      this.scene.add(tile);
    });
  }

  // altera o tamanho da grelha
  changeGridSize(size) {
    this.size = size;
    this.reset();
  }
}
