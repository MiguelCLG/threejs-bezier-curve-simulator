import * as THREE from "https://unpkg.com/three@0.124.0/build/three.module.js";

/**
 *
 * @param {*} bezierPointsAndTime - objecto literal que contem os 5 pontos e a variavel de tempo
 * {c0: Vector3, c1: Vector3, c2: Vector3, c3: Vector3, c4: Vector3, t: float}
 * 
 * Sugestão para o professor: Poderiamos usar typescript para ser mais explicito nos tipos de variaveis,
 * mas compreendo que pode adicionar um passo a mais de complexidade que não deveria ser requerida nestes efolios.
 * 
 */

function bezier4(bezierPointsAndTime){
    const { c0, c1, c2, c3, c4, t } = bezierPointsAndTime;
    
    // Equação fornecida no enunciado em ordem a x
    const x = Math.pow(1-t, 4) * c0.x + 
              4 * Math.pow(1 - t , 3)* t * c1.x + 
              6 * Math.pow(1 - t, 2) * Math.pow(t, 2) * c2.x +
              4 * (1 - t) * Math.pow(t, 3) * c3.x +
              Math.pow(t, 4) * c4.y;

    // Equação fornecida no enunciado em ordem a y
    const y = Math.pow(1-t, 4) * c0.y + 
              4 * Math.pow(1 - t , 3)* t * c1.y + 
              6 * Math.pow(1 - t, 2) * Math.pow(t, 2) * c2.y +
              4 * (1 - t) * Math.pow(t, 3) * c3.y +
              Math.pow(t, 4) * c4.y;

    // Equação fornecida no enunciado em ordem a z
    const z = Math.pow(1-t, 4) * c0.z + 
              4 * Math.pow(1 - t , 3)* t * c1.z + 
              6 * Math.pow(1 - t, 2) * Math.pow(t, 2) * c2.z +
              4 * (1 - t) * Math.pow(t, 3) * c3.z +
              Math.pow(t, 4) * c4.z;
    return new THREE.Vector3(x, y, z);
}


export { bezier4 };