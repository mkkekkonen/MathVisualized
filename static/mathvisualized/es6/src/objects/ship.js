import Konva from 'konva';
import Vector3 from '../math/vector';
import { black, strokeWidth } from '../constants/global';
import { defaultViewportMatrix } from '../util/util';

const MULTIPLIER = 48;

const polygonVectors = [
    new Vector3({ x: -0.25, y: 0.15, z: 0 }),
    new Vector3({ x: 0.25, y: 0, z: 0 }),
    new Vector3({ x: -0.25, y: -0.15, z: 0 }),
];

const linePoints = [];
polygonVectors.forEach((vector) => {
    linePoints.push(vector.x * MULTIPLIER);
    linePoints.push(vector.y * -MULTIPLIER);
});

class Ship {
    constructor() {
        this.location = new Vector3();
        const _location = defaultViewportMatrix.multiplyVector(this.location);
        this.polygon = new Konva.Line({
            points: linePoints,
            stroke: black,
            strokeWidth,
            closed: true,
            rotation: 270,
            x: _location.x,
            y: _location.y,
        });
    }

    updateLocation(location) {
        this.location = location;
        const _location = defaultViewportMatrix.multiplyVector(location);
        this.polygon.setAttr('x', _location.x);
        this.polygon.setAttr('y', _location.y);
        // console.log(`New coordinates: (${_location.x}, ${_location.y})`);
    }

    updateRotation(rotation) {
        this.polygon.setAttr('rotation', -rotation);
    }
}

export default Ship;
