/*
    efolioB - Curvas de Bézier  
    Miguel Gonçalves 1901337 - 09/01/2023
*/

import { bezier4 } from "/bezier4.mjs";
import Initialize from "./modules/init.mjs";
import * as THREE from "https://unpkg.com/three@0.124.0/build/three.module.js";

function TestBezierCurve() {
  let c0 = new THREE.Vector3(-10, 0, 0);
  let c1 = new THREE.Vector3(-5, 10, 0);
  let c2 = new THREE.Vector3(0, -10, 0);
  let c3 = new THREE.Vector3(5, 10, 0);
  let c4 = new THREE.Vector3(10, 0, 0);
  let t = 1;

  let R = bezier4({ c0, c1, c2, c3, c4, t });
  console.log(R);
}
// TestBezierCurve();
Initialize();
