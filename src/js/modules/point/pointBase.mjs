import * as THREE from "https://unpkg.com/three@0.124.0/build/three.module.js";
import { RandomFloatRange } from "../../utils/utils-functions.mjs";
import Singleton from "../singleton.mjs";

/**
 *
 * @export
 * @class PointBase
 * Base da class ponto que tem as suas funções de reset e de criação
 */
export default class PointBase {
  constructor(name = "c0", color = 0xffffff) {
    this.singleton = new Singleton();
    this.radius = 0.5;
    this.name = name;
    this.color = color;
    this.gridSize = this.singleton.grid.size;
    this.createPoint();

    // adiciono um event listener para o click do botao Reset para aumentar o range da posição dos pontos
    const botaoReset = document.getElementById("change-grid-btn");
    botaoReset.addEventListener("click", () =>
      this.changeGridSize(document.getElementById("size-input").value)
    );
  }

  // cria o ponto na cena
  createPoint() {
    let sphereGeometry = new THREE.SphereGeometry(this.radius, 16, 16);
    let sphereMaterial = new THREE.MeshBasicMaterial({
      color: this.color,
      side: THREE.DoubleSide,
    });

    // usamos a transparencia para 0.5 para dar mais ênfase quando selecionado
    sphereMaterial.transparent = true;
    sphereMaterial.opacity = 0.5;

    let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

    //Escolher a posição do ponto aleatóriamente
    let initialPosition = new THREE.Vector3(
      RandomFloatRange(-this.gridSize, this.gridSize), // x
      RandomFloatRange(-this.gridSize, this.gridSize), // y
      0 // z
    );

    // com a mesh, já podemos aceder à posição e então movemos
    sphere.position.x = initialPosition.x;
    sphere.position.y = initialPosition.y;
    sphere.position.z = initialPosition.z;

    // guarda o objecto da cena numa variavel interna para aceder mais tarde
    this.pointObject = sphere;
    this.singleton.scene.add(sphere);
  }

  changeGridSize(newSize) {
    this.gridSize = newSize;
    this.singleton.state.reset();
  }

  // Reseta a posição do ponto usando as funções utilitárias
  reset() {
    this.pointObject.position.x = RandomFloatRange(
      -this.gridSize,
      this.gridSize
    );
    this.pointObject.position.y = RandomFloatRange(
      -this.gridSize,
      this.gridSize
    );
    this.pointObject.position.z = 0;
  }
}
