import Konva from 'konva';

import Vector3 from '../vector';
import { dotRadius, red } from '../../constants/global';
import { defaultViewportMatrix } from '../../util/util';

export default class Point2D {
    constructor({ point, color = red, radius = dotRadius }) {
        this.point = point;
        this.color = color;
        this.radius = radius;
    }

    update({ x, y }) {
        this.point.x = x;
        this.point.y = y;
    }

    render({ layer, viewportMatrix = defaultViewportMatrix }) {
        const screenLocation = viewportMatrix.multiplyVector(this.point);
        const { x, y } = screenLocation;
        const circle = new Konva.Circle({
            x,
            y,
            radius: this.radius,
            fill: this.color,
        });
        layer.add(circle);
    }
}
