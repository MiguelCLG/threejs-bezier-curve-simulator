import PointBase from "./pointBase.mjs";
import * as THREE from "https://unpkg.com/three@0.124.0/build/three.module.js";

export default class Point extends PointBase {
    selected = false;
    constructor(name = "c0", color = 0xFFFFFF) {
        super(name, color);
        this.line = null;
    }

    selectPoint() {
        this.selected = true;
        this.pointObject.material.opacity = 1;
    }

    unselectPoint() {
        this.selected = false;
        this.pointObject.material.opacity = 0.5;
    }

    drawLine(){
        this.singleton.scene.remove(this.line);
        const material = new THREE.LineBasicMaterial({
            color: this.color
        });
        
        const points = [];
        points.push( new THREE.Vector3(this.pointObject.position.x, this.pointObject.position.y, this.pointObject.position.z) );
        points.push( new THREE.Vector3(this.pointObject.position.x, this.pointObject.position.y, 0 ) );
        
        const geometry = new THREE.BufferGeometry().setFromPoints( points );
        
        const line = new THREE.Line( geometry, material );
        this.singleton.scene.add( line );
        this.line = line;
    }

    clearLine()
    {
        if(this.line !== null)
        this.singleton.scene.remove(this.line);
    }

    update() {
        if(this.pointObject.position.z > 0.5 || this.pointObject.position.z < -0.5)
            this.drawLine();
        else
            {
                this.clearLine();
            }
    }
}