/*
    efolioB - Curvas de Bézier  
    Miguel Gonçalves 1901337 - 09/01/2023
*/

import * as THREE from "https://unpkg.com/three@0.124.0/build/three.module.js";
import Keyboard from "../utils/keyboard.mjs";
import Mouse from "../utils/mouse.mjs";
import Tamanhos from "../utils/tamanhos.mjs";
import Tempo from "../utils/tempo.mjs";
import Camera from "./threeSetup/camera.mjs";
import GridBase from "./grid/gridBase.mjs";
import Information from "./information.mjs";
import Point from "./point/point.mjs";
import Renderer from "./threeSetup/renderer.mjs";
import StateManagement from "./state/stateManagement.mjs";
/**
 * @class Singleton
 * Cria uma instancia desta class, usando o padrão de singleton para que haja apenas
 * uma class principal que gere o resto das classes.
 * @param canvas - canvas que vamos usar
 */
export default class Singleton {
  static instance; // instancia estática de criação do singleton

  constructor(canvas) {
    if (Singleton.instance) {
      // se fizermos um new Singleton() e já existir um, então esse não será criado e será retornado o existente.
      return Singleton.instance;
    }
    Singleton.instance = this;
    this.canvas = canvas;
    this.scene = new THREE.Scene();
    this.tempo = new Tempo();
    this.tamanhos = new Tamanhos();
    this.information = new Information();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.grid = new GridBase(10);

    // Class para manter a informação de estado separado, se quiser alterar o ponto selecionado
    this.state = new StateManagement();

    // Cria-se os pontos e registamos na memória como um array de modo a poder ter acesso
    this.points = [];
    this.points.push(new Point("c0", 0xffff00));
    this.points.push(new Point("c1", 0xff6600));
    this.points.push(new Point("c2", 0xff0000));
    this.points.push(new Point("c3", 0x00ff00));
    this.points.push(new Point("c4", 0x0000ff));

    this.mouse = new Mouse();
    this.keyboard = new Keyboard();

    // adiciona os eixos
    this.axesHelper = new THREE.AxesHelper(5);
    this.scene.add(this.axesHelper);

    // adiciona os listeners para os eventos emitidos
    this.tamanhos.on("resize", () => this.resize());
    this.tempo.on("update", () => this.update());
  }

  /**
   * Quando a janela é redimensionada, fazemos update a todas as dependencias
   */
  resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  /**
   * Quando queremos dar update com o metodo de requestAnimationFrame, queremos
   * chamar todas as funções de update em todas as classes restantes.
   * Quando adicionamos uma class nova, adicionamos a sua função de update aqui.
   */
  update() {
    this.renderer.update();
    this.information.update();
    this.points.forEach((point) => point.update());
  }
}
