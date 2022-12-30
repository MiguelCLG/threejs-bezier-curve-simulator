/*
    efolioB - Curvas de Bézier  
    Miguel Gonçalves 1901337 - 10/01/2023
*/

import * as THREE from "https://unpkg.com/three@0.124.0/build/three.module.js";
import Singleton from "./singleton.mjs";
import { lineMP } from "../../../lineMP.mjs";
import GridTile from "./gridTile.mjs";
import RasterTile from "./rasterTile.mjs";
import GridBase from "./gridBase.mjs";

/**
 *
 * @export
 * @class Grid
 * Gere a grelha em que vamos usar o algoritmo do ponto medio
 */
export default class Grid extends GridBase {
  rasterTileColor = 0xffff00;

  constructor(size = 10) {
    super();
    this.singleton = new Singleton();
    this.size = size;
    this.scene = this.singleton.scene;
    this.information = this.singleton.information;

    this.selectedTiles = []; // tiles que sao selecionados
    this.rasterizedTiles = []; // tiles que são rasterizados

    this.tiles = [];
    this.clear(); // dá reset à grid, neste caso cria uma nova
  }

  // cria um tile rasterizado
  createRasterTile(point) {
    return new RasterTile(
      1,
      { x: point.x, y: point.y, z: 0.25 },
      this.rasterTileColor
    );
  }

  // busca um tile na grelha por posição e devolve-o
  getTile(position) {
    const selectedTile = this.tiles.filter(
      (tile) => tile.position.x === position.x && tile.position.y === position.y
    )[0];
    return selectedTile;
  }

  // Seleciona o tile clicado
  selectTile(tileObject, color = 0xff0000) {
    // Se já selecionamos 2 tiles, então resetamos
    if (this.selectedTiles.length >= 2) {
      this.clear();
      this.information.updateData({
        lastCalculation: "N/A",
        selectedTiles: "N/A",
        lastClicked: "N/A",
      });
      return;
    }

    /* 
      havia 2 maneiras de fazer isto, ou mudavamos a cor do tile, 
      ou removiamos e criavamos outro no seu lugar, possívelmente seria melhor 
      mudar a cor apenas, mas como não estamos com problemas de performance deixei assim 
    */
    this.scene.remove(tileObject.tile);
    tileObject.setTileColor(color);
    this.scene.add(tileObject.tile);
    this.selectedTiles.push(tileObject);

    // se selecionamos 2, então corremos o algoritmo e criamos os tiles rasterizados
    if (this.selectedTiles.length === 2) {
      // corre o algoritmo do ponto medio
      const linePointVector = lineMP(
        this.selectedTiles[0].position,
        this.selectedTiles[1].position
      );

      // desenha a linha direta de um ponto ao outro
      this.drawLine(
        new THREE.Vector3(
          this.selectedTiles[0].position.x,
          this.selectedTiles[0].position.y,
          0.1
        ),
        new THREE.Vector3(
          this.selectedTiles[1].position.x,
          this.selectedTiles[1].position.y,
          0.1
        )
      );

      // constroi os tiles de acordo com o algoritmo
      this.drawRaster(linePointVector);

      // atualiza o painel de informação
      let displayInfo = "";
      linePointVector.forEach(
        ({ x, y }, index) => (displayInfo += `\n${index + 1}: (${x}, ${y})`)
      );
      let displaySelectedTiles = "";
      this.selectedTiles.forEach(
        ({ position }, index) =>
          (displaySelectedTiles += `\n${
            index + 1 === 1 ? "PointA: " : "PointB: "
          }(${position.x}, ${position.y})`)
      );
      this.information.updateData({
        lastCalculation: displayInfo,
        selectedTiles: displaySelectedTiles,
      });
    }
  }

  // cria e desenha os tiles rasterizados de acordo com os pontos devolvidos pelo algoritmo
  drawRaster(linePointVector) {
    linePointVector.forEach((point) => {
      const pixelToRender = this.createRasterTile(point);
      this.rasterizedTiles.push(pixelToRender.tile);
      this.scene.add(pixelToRender.tile);
    });
  }

  // desenha a linha directa entre o ponto A e o ponto B
  drawLine(p, q) {
    const points = [];
    const material = new THREE.LineBasicMaterial({ color: 0x000000 });

    points.push(p);
    points.push(q);

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    this.line = new THREE.Line(geometry, material);

    this.scene.add(this.line);
  }

  // limpa a estrutura de dados
  clean(clearRasterized) {
    if (this.tiles) this.tiles.forEach((tile) => this.scene.remove(tile.tile));
    this.tiles = [];
    if (clearRasterized) {
      this.rasterizedTiles.forEach((tile) => {
        this.scene.remove(tile);
      });
      this.rasterizedTiles = [];
    }
    this.selectedTiles = [];
    this.scene.remove(this.line);
  }

  // dá reset à estrutura de dados e à grelha
  // se clearRasterized é true, então limpa também os tiles rasterizados
  clear(clearRasterized = false) {
    this.clean(clearRasterized);
    this.tiles = this.createGrid(this.size, this.tileColor1, this.tileColor2);
    this.tiles.forEach(({ tile }) => {
      this.scene.add(tile);
    });
    this.reset();

  }
}
