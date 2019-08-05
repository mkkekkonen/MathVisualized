import { lineTypes } from './geometry/line2D';
import { round, degreesToRadians } from './util';

class Vector3 {
    constructor(args = { x: 0, y: 0, z: 0 }) {
        const { x, y, z, w } = args;
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
        this.w = w || 1;
    }

    get length() {
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
    }

    get isAllZeros() {
        return (this.x === 0) && (this.y === 0) && (this.z === 0);
    }

    add(vector) {
        return new Vector3({
            x: this.x + vector.x,
            y: this.y + vector.y,
            z: this.z + vector.z,
        });
    }

    subtract(vector) {
        return new Vector3({
            x: this.x - vector.x,
            y: this.y - vector.y,
            z: this.z - vector.z,
        });
    }

    multiply(scalar) {
        return new Vector3({
            x: this.x * scalar,
            y: this.y * scalar,
            z: this.z * scalar,
        });
    }

    divide(scalar) {
        return new Vector3({
            x: this.x / scalar,
            y: this.y / scalar,
            z: this.z / scalar,
        });
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

    equals(vector) {
        return (this.x === vector.x)
            && (this.y === vector.y)
            && (this.z === vector.z);
    }

    static polarCoordinates({ r, theta }) {
        return new Vector3({
            x: r * Math.cos(degreesToRadians(theta)),
            y: r * Math.sin(degreesToRadians(theta)),
            z: 0,
        });
    }
}

export default Vector3;
