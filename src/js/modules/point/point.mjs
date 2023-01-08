import PointBase from "./pointBase.mjs";
import * as THREE from "https://unpkg.com/three@0.124.0/build/three.module.js";
/**
 *
 * @export
 * @class Point
 * @extends {PointBase}
 *
 * Objecto que gere quando o ponto é selecionado
 * Desenha a linha perpendicular ao plano dependendo da posição do ponto
 */
export default class Point extends PointBase {
  selected = false;
  constructor(name = "c0", color = 0xffffff) {
    super(name, color);
    this.line = null;
  }

  // aumenta a opacidade para ficar completamente opaco
  selectPoint() {
    this.selected = true;
    this.pointObject.material.opacity = 1;
  }

  // diminui a opacidade para ficar completamente opaco
  unselectPoint() {
    this.selected = false;
    this.pointObject.material.opacity = 0.5;
  }

  // desenha a linha
  drawLine() {
    this.singleton.scene.remove(this.line);

    const material = new THREE.LineBasicMaterial({
      color: this.color,
    });

    const points = [];
    points.push(
      new THREE.Vector3(
        this.pointObject.position.x,
        this.pointObject.position.y,
        this.pointObject.position.z
      )
    );
    points.push(
      new THREE.Vector3(
        this.pointObject.position.x,
        this.pointObject.position.y,
        0
      )
    );

    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const line = new THREE.Line(geometry, material);
    this.singleton.scene.add(line);
    this.line = line;
  }

  // remove a linha da cena
  clearLine() {
    if (this.line !== null) this.singleton.scene.remove(this.line);
  }

  // usamos a função update para saber quando o ponto está fora do plano,
  // que neste caso, é o seu raio
  update() {
    if (this.pointObject.position.z > 0.5 || this.pointObject.position.z < -0.5)
      this.drawLine();
    else {
      this.clearLine();
    }
  }
}
