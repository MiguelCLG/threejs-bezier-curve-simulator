import { bezier4 } from "/bezier4.mjs";
import * as THREE from "https://unpkg.com/three@0.124.0/build/three.module.js";

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

export default QuarticBezierCurve;