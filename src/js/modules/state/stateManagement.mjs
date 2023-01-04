import Singleton from "../singleton.mjs";
import QuarticBezierCurve from '../quarticBezierCurve.mjs';
import * as THREE from "https://unpkg.com/three@0.124.0/build/three.module.js";

export default class StateManagement {
    constructor()
    {
        this.singleton = new Singleton();
        this.selectedPoint = null;
        this.curves = [];
    }

    createBezier()
    {
    
        const { anchorPoints } = this.singleton;

        const c0 = anchorPoints[0].pointObject.position;
        const c1 = anchorPoints[1].pointObject.position;
        const c2 = anchorPoints[2].pointObject.position;
        const c3 = anchorPoints[3].pointObject.position;
        const c4 = anchorPoints[4].pointObject.position;

        const curve = new QuarticBezierCurve(
            c0, c1, c2, c3, c4
        );
        
        const geometry = new THREE.TubeGeometry( curve, 100, .3, 8, false );
        const material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
        const mesh = new THREE.Mesh( geometry, material );

        this.curves.push(mesh);
        this.singleton.scene.add( mesh );
    }

    getPointPosition(){
        return this.selectedPoint.pointObject.position;
    }
    setSelectedPoint(pointName) {
        //TODO: Adicionar o nome à informação para o user
        const { anchorPoints } = this.singleton;
        anchorPoints.forEach((point) => {
            this.unselectPoint(point); 
        });
        this.selectedPoint = anchorPoints.find(p => p.name === pointName);
        this.selectedPoint.selectPoint();
    }

    unselectPoint(point) {
        if(!point.selected && this.selectedPoint === null) return;
        this.selectedPoint = null;
        point.unselectPoint(); 
    }

    setPointPosition(newPosition) {
        if(!this.selectedPoint) return;
        const { x, y, z } = newPosition;
        this.selectedPoint.pointObject.position.x = x;
        this.selectedPoint.pointObject.position.z = z;
        this.selectedPoint.pointObject.position.y = y;
    }

    movePointUpwards() {
        if(!this.selectedPoint) return;
        this.selectedPoint.pointObject.position.y += .1;
    }

    movePointDownwards(){
        if(!this.selectedPoint) return;
        this.selectedPoint.pointObject.position.y -= .1;
    }

    clearCurves() {
        this.curves.forEach((curve) =>
            this.singleton.scene.remove(curve)
        )
        this.curves = [];
    }

    reset(){
        this.clearCurves();
        this.singleton.anchorPoints.forEach((point) => point.reset());
    }
}