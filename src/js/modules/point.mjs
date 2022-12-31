import PointBase from "./pointBase.mjs";

export default class Point extends PointBase {
    selected = false;
    constructor(name = "c0", color = 0xFFFFFF) {
        super(name, color)
    }

    selectPoint() {
        this.selected = true;
        this.pointObject.material.transparent = true;
        this.pointObject.material.opacity = 1;
    }

    unselectPoint() {
        this.pointObject.material.opacity = 0.5;
    }
}