import * as THREE from "https://unpkg.com/three@0.124.0/build/three.module.js";
import { RandomFloatRange } from "../utils/utils-functions.mjs";
export default class Point {
    constructor(name = "c0", color = "blue"){
        this.size = 0.5;
        this.name = name;
        this.color = color;

        //Randomizar a posição do ponto 
        this.pointPosition = new THREE.Vector3(
            RandomFloatRange(-10, 10),  // x
            RandomFloatRange(-10, 10),  // y
            RandomFloatRange(-10, 10)   // z
        );
    }
}