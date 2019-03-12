import AbstractKinematics2D from './abstractKinematics2D';
import Vector3 from '../math/vector';
import { positionDeltaFromVelocity } from '../physics/equations';
import { round } from '../math/util';

const RADIUS = 1;
const TURN_DELTA = 20; // degrees per second

class ObjectKinematics2D extends AbstractKinematics2D {
    constructor(position) {
        super();
        this.position = position;
        this.directionPolarCoordinates = { r: RADIUS, theta: 0 };
        this.velocity = new Vector3({ x: 0, y: 0, z: 0 });
        this.speed = 0;
        this.accelerationScalar = 0;
    }

    get rotation() {
        return this.directionPolarCoordinates.theta;
    }

    update(time, { turnLeft, turnRight }) {
        const direction = Vector3.polarCoordinates(this.directionPolarCoordinates);

        const velocityDelta = direction.multiply(this.accelerationScalar * time);
        this.velocity = this.velocity.add(velocityDelta);

        const positionDelta = positionDeltaFromVelocity({
            velocity: this.velocity,
            time,
        });
        this.position = this.position.add(
            positionDelta,
        );

        if (turnLeft) {
            this.turnLeft(time);
        } else if (turnRight) {
            this.turnRight(time);
        }
    }

    turnLeft(time) {
        const directionPolarCoordinates = { ...this.directionPolarCoordinates };
        directionPolarCoordinates.theta += TURN_DELTA * time;
        if (directionPolarCoordinates.theta >= 360) {
            directionPolarCoordinates.theta -= 360;
        }
        this.directionPolarCoordinates = directionPolarCoordinates;
    }

    turnRight(time) {
        const directionPolarCoordinates = { ...this.directionPolarCoordinates };
        directionPolarCoordinates.theta -= TURN_DELTA * time;
        if (directionPolarCoordinates.theta < 0) {
            directionPolarCoordinates.theta += 360;
        }
        this.directionPolarCoordinates = directionPolarCoordinates;
    }

    toString() {
        let str = 'ObjectKinematics2D:\n';
        str += `~ acceleration: ${round(this.accelerationScalar)} units/s^2\n`;
        str += `~ velocity: ${round(this.speed)} units/s\n`;
        str += `~ direction polar coords angle: ${round(this.directionPolarCoordinates.theta)}\n`;
        str += `~ position: (${round(this.position.x)}, ${round(this.position.y)})\n`;
        return str;
    }
}

export default ObjectKinematics2D;
