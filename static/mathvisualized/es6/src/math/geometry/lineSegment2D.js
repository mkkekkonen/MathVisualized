import Konva from 'konva';

import { round, radiansToDegrees } from '../util';
import Vector3 from '../vector';
import { black, strokeWidth as defaultStrokeWidth } from '../../constants/global';
import { defaultViewportMatrix } from '../../util/util';

class LineSegment2D {
    constructor({
        startPoint,
        endPoint,
        strokeColor = black,
        strokeWidth = defaultStrokeWidth,
    }) {
        this.startPoint = startPoint;
        this.endPoint = endPoint;
        this.strokeColor = strokeColor;
        this.strokeWidth = strokeWidth;
    }

    get length() {
        return this.startPoint.distanceFrom(this.endPoint);
    }

    get midpoint() {
        if (this.startPoint && this.endPoint) {
            const x = (this.startPoint.x + this.endPoint.x) / 2;
            const y = (this.startPoint.y + this.endPoint.y) / 2;
            return new Vector3({ x, y, z: 0 });
        }
        return new Vector3({ x: 0, y: 0, z: 0 });
    }

    get slope() {
        if (this.startPoint && this.endPoint) {
            const deltaY = this.endPoint.y - this.startPoint.y;
            const deltaX = this.endPoint.x - this.startPoint.x;
            if (deltaX === 0) {
                return NaN;
            }
            return deltaY / deltaX;
        }
        return 0;
    }

    get directionalAngle() {
        if (Number.isNaN(this.slope)) {
            return 90;
        }

        const angleInRadians = Math.atan(this.slope);
        return radiansToDegrees(angleInRadians);
    }

    konvaRender({ layer, viewportMatrix = defaultViewportMatrix }) {
        if (this.startPoint && this.endPoint) {
            const screenStartPoint = viewportMatrix.multiplyVector(this.startPoint);
            const screenEndPoint = viewportMatrix.multiplyVector(this.endPoint);
            this.konvaLine = new Konva.Line({
                points: [screenStartPoint.x, screenStartPoint.y,
                    screenEndPoint.x, screenEndPoint.y],
                stroke: this.strokeColor,
                strokeWidth: this.strokeWidth,
            });
            layer.add(this.konvaLine);
        }
    }

    update({ startPoint, endPoint }) {
        this.startPoint = startPoint;
        this.endPoint = endPoint;
    }

    toString(args = {}) {
        const { midpoint, slope, directionalAngle } = args;

        let str = 'Line:\n';
        str += `- startPoint: ${this.startPoint.toString()}\n`;
        str += `- endPoint: ${this.endPoint.toString()}\n`;
        str += `- length: ${round(this.length)}\n`;

        if (midpoint) {
            str += `- midpoint: ${this.midpoint.toString()}\n`;
        }

        if (slope) {
            str += `- slope: ${round(this.slope)}\n`;
        }

        if (directionalAngle) {
            str += `- directional angle: ${round(this.directionalAngle)}\n`;
        }

        return str;
    }
}

export default LineSegment2D;
