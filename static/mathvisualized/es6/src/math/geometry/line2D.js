import { round } from '../util';
import Vector3 from '../vector';

class Line2D {
    constructor({ startPoint, endPoint }) {
        this.startPoint = startPoint;
        this.endPoint = endPoint;
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

    toString(midpoint) {
        return `Line:
- startPoint: ${this.startPoint.toString()}
- endPoint: ${this.endPoint.toString()}
- length: ${round(this.length)}
${midpoint && `- midpoint: ${this.midpoint.toString()}`}`;
    }
}

export default Line2D;
