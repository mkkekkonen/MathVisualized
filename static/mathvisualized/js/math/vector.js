import { round } from './util';

class Vector3 {
    constructor({
        x, y, z, w
    }) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w || 1;
    }

    distanceFrom(vector) {
        return Math.sqrt((vector.x - this.x) ** 2 + (vector.y - this.y) ** 2);
    }

    toString() {
        return `Vector3 ~ (${round(this.x)}, ${round(this.y)}, ${round(this.z)})`;
    }
}

export default Vector3;