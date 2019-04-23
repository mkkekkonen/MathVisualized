import AbstractPhysics2D from './abstractPhysics2D';
import Vector3 from '../math/vector';
import ObjectSteering2D from '../input/objectSteering2D';
import { positionDeltaFromVelocity } from '../physics/equations';
import { round } from '../math/util';

const RADIUS = 1;

class ObjectKinematics2D extends AbstractPhysics2D {
    constructor(position, { steering } = {}) {
        super();
        this.position = position;
        this.directionPolarCoordinates = { r: RADIUS, theta: 0 };
        this.velocity = new Vector3();
        this.speed = 0;
        this.acceleration = new Vector3();

        if (steering) {
            this.steering = new ObjectSteering2D();
            this.accelerationScalar = 0;
        }
    }

    get rotation() {
        return this.directionPolarCoordinates.theta;
    }

    get accelerationToString() {
        if (this.steering) {
            return `${round(this.accelerationScalar)} units/s^2`;
        }
        return `${round(this.acceleration.length)} units/s^2`;
    }

    update(time, acceleration = new Vector3(), { accelerationScalar, turnLeft, turnRight }) {
        if (this.steering && accelerationScalar === undefined) {
            throw new Error('Scalar acceleration required with steering!');
        }

        const velocityDelta = this.steering
            ? this.steering.calculateVelocityDelta(time, accelerationScalar)
            : acceleration.multiply(time);

        this.velocity = this.velocity.add(velocityDelta);
        this.speed = this.velocity.length;

        const positionDelta = positionDeltaFromVelocity({
            velocity: this.velocity,
            time,
        });
        this.position = this.position.add(
            positionDelta,
        );

        if (this.steering) {
            this.steering.update(time, { turnLeft, turnRight });
            this.accelerationScalar = accelerationScalar;
        }
    }

    toString() {
        let str = 'ObjectKinematics2D:\n';
        str += `~ acceleration: ${this.accelerationToString}\n`;
        str += `~ velocity: ${round(this.speed)} units/s\n`;
        str += `~ direction polar coords angle: ${round(this.directionPolarCoordinates.theta)}\n`;
        str += `~ position: (${round(this.position.x)}, ${round(this.position.y)})\n`;
        return str;
    }
}

export default ObjectKinematics2D;
