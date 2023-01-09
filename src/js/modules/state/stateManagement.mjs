/*
    efolioB - Curvas de Bézier  
    Miguel Gonçalves 1901337 - 09/01/2023
*/

import Singleton from "../singleton.mjs";
import QuarticBezierCurve from "./quarticBezierCurve.mjs";
import * as THREE from "https://unpkg.com/three@0.124.0/build/three.module.js";
import { RandomIntRangeInclusive } from "../../utils/utils-functions.mjs";
import { colors } from "../../utils/constants.mjs";

/**
 *
 * @export
 * @class StateManagement
 *
 * Gere as funcionalidades do mundo criado e as informações mais relevantes que sejam utilizadas por outras classes. É apenas criado pelo singleton.
 * É responsável por selecionar e descelecionar pontos.
 * É responsável pelo movimento dos pontos.
 * É responsável por criar as curvas de bezier de acordo com a posição dos pontos.
 */

export default class StateManagement {
  constructor() {
    this.singleton = new Singleton();

    // estado do ponto selecionado
    this.selectedPoint = null;

    // array de curvas criadas (ajuda para depois poder fazer reset)
    this.curves = [];
    this.timer = 0;
    this.moveSpeed = 0.1;
  }

  // Criação da curva de bezier
  createBezier() {
    const { points } = this.singleton;

    // vai buscar a posição dos pontos na cena
    // NOTA: se queremos estender para adicionar mais pontos (por exemplo 50 pontos), possívelmente seria melhor criar um sistema de geração de pontos, mas como são apenas 5, isto é o suficiente.
    const c0 = points[0].pointObject.position;
    const c1 = points[1].pointObject.position;
    const c2 = points[2].pointObject.position;
    const c3 = points[3].pointObject.position;
    const c4 = points[4].pointObject.position;

    // cria a curva de bezier usando a os pontos na cena
    const curve = new QuarticBezierCurve(c0, c1, c2, c3, c4);

    // criação da geometria, material e mesh
    const geometry = new THREE.TubeGeometry(curve, 100, 0.3, 8, false);
    const material = new THREE.MeshBasicMaterial({
      color: colors[RandomIntRangeInclusive(0, colors.length)],
    });
    const mesh = new THREE.Mesh(geometry, material);

    // adicionamos a curva ao array e depois à cena
    this.curves.push(mesh);
    this.singleton.scene.add(mesh);
  }

  // retorna a posição do ponto selecionado
  getPointPosition() {
    return this.selectedPoint.pointObject.position;
  }

  setSelectedPoint(pointName) {
    const { points } = this.singleton;
    // descelecionamos todos os pontos para evitar bugs

    if (this.selectedPoint)
      points.forEach((point) => {
        this.unselectPoint(point);
      });

    this.selectedPoint = points.find((p) => p.name === pointName);
    this.selectedPoint.selectPoint();

    const { x, y, z } = this.selectedPoint.pointObject.position;
    // dá update à informação sobre o ponto selecionado e a sua posição, para questões de limpeza, decidi apenas deixar 2 casas decimais.
    this.singleton.information.updateData({
      point: this.selectedPoint.name,
      coordenates: `(${x.toFixed(2)}, ${y.toFixed(2)}, ${z.toFixed(2)})`,
    });
  }

  // desceleciona o ponto recebido
  unselectPoint(point) {
    // se não existe ponto selecionado, retorna
    if (!point.selected && this.selectedPoint === null) return;

    this.selectedPoint = null;
    point.unselectPoint();

    // dá update à informação
    this.singleton.information.updateData({
      point: "N/A",
      coordenates: `N/A`,
    });
  }

  // movimenta o ponto selecionado para uma nova posição recebida
  setPointPosition(newPosition) {
    // se não existe ponto selecionado, retorna
    if (!this.selectedPoint) return;

    // damos assign às posições nos eixos
    this.selectedPoint.pointObject.position.x = newPosition.x;
    this.selectedPoint.pointObject.position.z = newPosition.z;
    this.selectedPoint.pointObject.position.y = newPosition.y;

    const { x, y, z } = this.selectedPoint.pointObject.position;

    // dá update à informação
    this.singleton.information.updateData({
      point: this.selectedPoint.name,
      coordenates: `(${x.toFixed(2)}, ${y.toFixed(2)}, ${z.toFixed(2)})`,
    });
  }

  // move o ponto positivamente
  movePointUpwards() {
    // se não existe ponto selecionado, retorna
    if (!this.selectedPoint) return;

    // queremos apenas mover no eixo dos z
    this.selectedPoint.pointObject.position.z += this.moveSpeed;
    this.updateTimer();

    const { x, y, z } = this.selectedPoint.pointObject.position;

    // dá update à informação
    this.singleton.information.updateData({
      point: this.selectedPoint.name,
      coordenates: `(${x.toFixed(2)}, ${y.toFixed(2)}, ${z.toFixed(2)})`,
    });
  }

  // move o ponto negativamente
  movePointDownwards() {
    // se não existe ponto selecionado, retorna
    if (!this.selectedPoint) return;

    // queremos apenas mover no eixo dos z
    this.selectedPoint.pointObject.position.z -= this.moveSpeed;
    this.updateTimer();

    // queremos apenas mover no eixo dos z
    const { x, y, z } = this.selectedPoint.pointObject.position;

    // dá update à informação
    this.singleton.information.updateData({
      point: this.selectedPoint.name,
      coordenates: `(${x.toFixed(2)}, ${y.toFixed(2)}, ${z.toFixed(2)})`,
    });
  }

  // timer para saber se as teclas W ou S estão constantemente a ser premidas (keydown)
  updateTimer() {
    this.timer += 0.016;
  }

  // chamado quando as teclas W ou S são soltas (keyup)
  resetTimer() {
    this.timer = 0;
  }

  // Remove as curvas e dá clean ao UI
  clearCurves() {
    this.curves.forEach((curve) => this.singleton.scene.remove(curve));
    this.curves = [];
    this.singleton.information.updateData({
      point: `N/A`,
      coordenates: `N/A`,
    });
  }

  // Remoção de curvas e randomiza os pontos, chamando a função reset deles
  reset() {
    this.clearCurves();
    this.singleton.points.forEach((point) => point.reset());
  }

  update() {
    if (this.timer > 1) {
      this.moveSpeed = 0.5;
    } else {
      this.moveSpeed = 0.1;
    }
  }
}
