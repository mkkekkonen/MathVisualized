import Vector3 from '../math/vector';

const RADIUS = 1;

class ObjectSteering2D {
    /**
     * A component for object kinematics for steering
     * @param {number} turnDelta Degrees per second
     */
    constructor(turnDelta = 20) {
        this.directionPolarCoordinates = { r: RADIUS, theta: 0 };
        this.turnDelta = turnDelta;
    }

    get rotation() {
        return this.directionPolarCoordinates.theta;
    }

    update(time, { turnLeft, turnRight }) {
        if (turnLeft) {
            this.turnLeft(time);
        } else if (turnRight) {
            this.turnRight(time);
        }
    }

    calculateVelocityDelta(time, accelerationScalar) {
        const direction = Vector3.polarCoordinates(this.directionPolarCoordinates);

        const velocityDelta = direction.multiply(accelerationScalar * time);

        return velocityDelta;
    }

    turnLeft(time) {
        const directionPolarCoordinates = { ...this.directionPolarCoordinates };
        directionPolarCoordinates.theta += this.turnDelta * time;
        if (directionPolarCoordinates.theta >= 360) {
            directionPolarCoordinates.theta -= 360;
        }
        this.directionPolarCoordinates = directionPolarCoordinates;
    }

    turnRight(time) {
        const directionPolarCoordinates = { ...this.directionPolarCoordinates };
        directionPolarCoordinates.theta -= this.turnDelta * time;
        if (directionPolarCoordinates.theta < 0) {
            directionPolarCoordinates.theta += 360;
        }
        this.directionPolarCoordinates = directionPolarCoordinates;
    }
}

export default ObjectSteering2D;
