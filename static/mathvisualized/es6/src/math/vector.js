import { lineTypes } from './geometry/line2D';
import { round } from './util';

class Vector3 {
    constructor({
        x, y, z, w,
    }) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w || 1;
    }

    distanceFrom(vector) {
        return Math.sqrt(((vector.x - this.x) ** 2)
            + ((vector.y - this.y) ** 2));
    }

    distanceFromLine(line) {
        if (line.type !== lineTypes.GENERAL) {
            return 0;
        }
        const { a, b, c } = line;
        return Math.abs(((a * this.x) + (b * this.y) + c) /
            Math.sqrt((a * a) + (b * b)));
    }

    toString() {
        return `Vector3 ~ (${round(this.x)}, ${round(this.y)}, ${round(this.z)})`;
    }
}

export default Vector3;
