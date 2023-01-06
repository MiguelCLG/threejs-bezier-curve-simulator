import Singleton from "../singleton.mjs";
import QuarticBezierCurve from '../quarticBezierCurve.mjs';
import * as THREE from "https://unpkg.com/three@0.124.0/build/three.module.js";
import { RandomIntRangeInclusive } from "../../utils/utils-functions.mjs";

export default class StateManagement {
    constructor()
    {
        this.singleton = new Singleton();
        this.selectedPoint = null;
        this.curves = [];
        this.curvesColor = [
            0xff0000,
            0xffffff,
            0xff00ff,
            0x00ffff,
            0x0000ff,
            0x333333,
            0xff0077
        ]
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
        const material = new THREE.MeshBasicMaterial( { color: this.curvesColor[RandomIntRangeInclusive(0, this.curvesColor.length)] } );
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
        this.singleton.information.updateData({
            point: this.selectedPoint.name,
            coordenates: `(${this.selectedPoint.pointObject.position.x.toFixed(2)}, ${this.selectedPoint.pointObject.position.y.toFixed(2)}, ${this.selectedPoint.pointObject.position.z.toFixed(2)})`
        });
    }

    unselectPoint(point) {
        if(!point.selected && this.selectedPoint === null) return;
        this.selectedPoint = null;
        point.unselectPoint(); 
        this.singleton.information.updateData({
            point: "N/A",
            coordenates: `N/A`
        });
    }

    setPointPosition(newPosition) {
        if(!this.selectedPoint) return;
        const { x, y, z } = newPosition;
        this.selectedPoint.pointObject.position.x = x;
        this.selectedPoint.pointObject.position.z = z;
        this.selectedPoint.pointObject.position.y = y;
        this.singleton.information.updateData({
            point: this.selectedPoint.name,
            coordenates: `(${this.selectedPoint.pointObject.position.x.toFixed(2)}, ${this.selectedPoint.pointObject.position.y.toFixed(2)}, ${this.selectedPoint.pointObject.position.z.toFixed(2)})`
        })
    }

    movePointUpwards() {
        if(!this.selectedPoint) return;
        this.selectedPoint.pointObject.position.z += .1;
        this.singleton.information.updateData({
            point: this.selectedPoint.name,
            coordenates: `(${this.selectedPoint.pointObject.position.x.toFixed(2)}, ${this.selectedPoint.pointObject.position.y.toFixed(2)}, ${this.selectedPoint.pointObject.position.z.toFixed(2)})`
        })
    }

    movePointDownwards(){
        if(!this.selectedPoint) return;
        this.selectedPoint.pointObject.position.z -= .1;
        this.singleton.information.updateData({
            point: this.selectedPoint.name,
            coordenates: `(${this.selectedPoint.pointObject.position.x.toFixed(2)}, ${this.selectedPoint.pointObject.position.y.toFixed(2)}, ${this.selectedPoint.pointObject.position.z.toFixed(2)})`
        })
    }

    clearCurves() {
        this.curves.forEach((curve) =>
            this.singleton.scene.remove(curve)
        )
        this.curves = [];
        this.singleton.information.updateData({
            point: `N/A`,
            coordenates: `N/A`
        })
    }

    reset(){
        this.clearCurves();
        this.singleton.anchorPoints.forEach((point) => point.reset());
    }
}