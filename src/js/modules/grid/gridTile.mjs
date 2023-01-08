/*
    efolioB - Curvas de Bézier  
    Miguel Gonçalves 1901337 - 09/01/2023
*/

import * as THREE from "https://unpkg.com/three@0.124.0/build/three.module.js";

/**
 *
 * @export
 * @class GridTile
 * Estrutura de dados do tile da grid, é gerido pela GridBase
 * Recebe o seu tamanho, posicao e cor
 */
export default class GridTile {
  constructor(size, position, color) {
    this.size = size;
    this.position = position;
    this.color = color;
    this.tile = this.createTile(
      this.position.x,
      this.position.y,
      this.position.z,
      this.size,
      this.color
    );
  }

  createTile(x, y, z, tileSize, cor) {
    let tileGeometry = new THREE.BoxGeometry(tileSize, tileSize, 0.1);
    let tileMaterial = new THREE.MeshBasicMaterial({
      color: cor,
    });

    tileMaterial.opacity = 0.3;
    tileMaterial.transparent = true;

    let tile = new THREE.Mesh(tileGeometry, tileMaterial);
    tile.position.x = x;
    tile.position.y = y;
    tile.position.z = z;
    return tile;
  }

  setTileColor(color) {
    this.color = color;
    this.tile = this.createTile(
      this.position.x,
      this.position.y,
      this.position.z,
      this.size,
      this.color
    );
  }
}
