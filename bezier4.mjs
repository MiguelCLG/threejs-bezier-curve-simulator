/*
    efolioB - Curvas de Bézier  
    Miguel Gonçalves 1901337 - 09/01/2023
*/

import * as THREE from "https://unpkg.com/three@0.124.0/build/three.module.js";

/**
 *
 * @param {*} bezierPointsAndTime - objecto literal que contem os 5 pontos e a variavel de tempo
 * {c0: Vector3, c1: Vector3, c2: Vector3, c3: Vector3, c4: Vector3, t: float}
 *
 */

function bezier4(bezierPointsAndTime) {
  const { c0, c1, c2, c3, c4, t } = bezierPointsAndTime;

  // Equação fornecida no enunciado em ordem a x
  const x = QuarticBezierOnAxis(c0.x, c1.x, c2.x, c3.x, c4.x, t);

  // Equação fornecida no enunciado em ordem a y
  const y = QuarticBezierOnAxis(c0.y, c1.y, c2.y, c3.y, c4.y, t);

  // Equação fornecida no enunciado em ordem a z
  const z = QuarticBezierOnAxis(c0.z, c1.z, c2.z, c3.z, c4.z, t);

  return new THREE.Vector3(x, y, z);
}

// retorna o resultado do calculo da equação fornecida no enunciado
function QuarticBezierOnAxis(c0, c1, c2, c3, c4, t) {
  return (
    Math.pow(1 - t, 4) * c0 +
    4 * Math.pow(1 - t, 3) * t * c1 +
    6 * Math.pow(1 - t, 2) * Math.pow(t, 2) * c2 +
    4 * (1 - t) * Math.pow(t, 3) * c3 +
    Math.pow(t, 4) * c4
  );
}

export { bezier4 };
