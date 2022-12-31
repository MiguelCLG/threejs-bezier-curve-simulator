import * as THREE from "https://unpkg.com/three@0.124.0/build/three.module.js";
import { RandomFloatRange } from "../utils/utils-functions.mjs";
import Singleton from "./singleton.mjs";

export default class PointBase {
    constructor(name = "c0", color = 0xFFFFFF){
        this.singleton = new Singleton();
        this.radius = 0.5;
        this.name = name;
        this.color = color;

        //Randomizar a posição do ponto 
        this.pointPosition = new THREE.Vector3(
            RandomFloatRange(-10, 10),  // x
            RandomFloatRange(-10, 10),  // y
            RandomFloatRange(-1, 1)     // z
        );
        this.createPoint();
    }

    createPoint() {
        let sphereGeometry = new THREE.SphereGeometry(this.radius, 16, 16);
        let sphereMaterial = new THREE.MeshBasicMaterial({
            color: this.color,
            side: THREE.DoubleSide,
        });

        sphereMaterial.transparent = true;
        sphereMaterial.opacity = 0.7;

        let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphere.position.x = this.pointPosition.x;
        sphere.position.y = this.pointPosition.y;
        sphere.position.z = this.pointPosition.z;

        this.pointObject = sphere;
        this.singleton.scene.add(sphere);

    }
}