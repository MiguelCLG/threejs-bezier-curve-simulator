import Singleton from "../singleton.mjs";
import * as THREE from "https://unpkg.com/three@0.124.0/build/three.module.js";
import { bezier4 } from "/bezier4.mjs";

class QuarticBezierCurve extends THREE.Curve {

	constructor( 
                c0 = new THREE.Vector3(), 
                c1 = new THREE.Vector3(), 
                c2 = new THREE.Vector3(), 
                c3 = new THREE.Vector3(), 
                c4 = new THREE.Vector3() 
    ) {

		super();

		this.isQuarticBezierCurve4 = true;

		this.type = 'QuarticBezierCurve4';

		this.c0 = c0;
		this.c1 = c1;
		this.c2 = c2;
		this.c3 = c3;
		this.c4 = c4;

	}

	getPoint( t, optionalTarget = new THREE.Vector3() ) {

		const point = optionalTarget;

		const c0 = this.c0, c1 = this.c1, c2 = this.c2, c3 = this.c3, c4 = this.c4;

		const vector = bezier4( {c0, c1, c2, c3, c4, t} );
		point.set(
			vector.x,
			vector.y,
			vector.z
		);

		return point;

	}

}

export default class StateManagement {
    constructor()
    {
        this.singleton = new Singleton();
        this.selectedPoint = null;
    }
    setSelectedPoint(pointName) {
        //TODO: Adicionar o nome à informação para o user
        const { anchorPoints } = this.singleton;
        this.selectedPoint = anchorPoints.find(p => p.name === pointName);
        anchorPoints.forEach((point) => {
            if (point.name === pointName && !point.selected) point.selectPoint();
            else point.unselectPoint();
        });
    }

    setPointPosition(newPosition) {
        const { x, y, z } = newPosition;
        this.selectedPoint.pointObject.position.x = x;
        this.selectedPoint.pointObject.position.z = z;
        this.selectedPoint.pointObject.position.y = y;
    }

    movePointUpwards() {
        this.selectedPoint.pointObject.position.y += .1;
    }

    movePointDownwards(){
        this.selectedPoint.pointObject.position.y -= .1;
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
        this.singleton.scene.add( mesh );
    }
}