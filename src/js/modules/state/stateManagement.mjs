import Singleton from "../singleton.mjs";

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
}