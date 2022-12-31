import Singleton from "../singleton.mjs";

export default class StateManagement {
    constructor()
    {
        this.singleton = new Singleton();
        this.selectedPoint = null;
    }
    setSelectedPoint(pointName) {
        const { anchorPoints } = this.singleton;
        this.selectedPoint = anchorPoints.find(p => p.name === pointName);
        console.log(this.selectedPoint);
        anchorPoints.forEach((point) => {
            if (point.name === pointName && !point.selected) point.selectPoint();
            else point.unselectPoint();
        });
    }
}