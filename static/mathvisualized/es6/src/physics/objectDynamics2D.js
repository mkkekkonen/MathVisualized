import AbstractPhysics2D from './abstractPhysics2D';
import ObjectKinematics2D from './objectKinematics2D';
import Vector3 from '../math/vector';

class ObjectDynamics2D extends AbstractPhysics2D {
    constructor({ position, massKg }) {
        super();
        this.position = position || new Vector3();

        if (!massKg && massKg !== 0) {
            throw new Error('No mass specified!');
        }

        this.mass = massKg;
        this.kinematics = new ObjectKinematics2D(position);
        this.velocity = new Vector3();
    }

    update(time, force) {
        const acceleration = force
            ? force.divide(this.mass)
            : new Vector3();

        const velocityDelta = acceleration.multiply(time);
        this.velocity = this.velocity.add(velocityDelta);

        const positionDelta = this.velocity.multiply(time);
        this.position = this.position.add(positionDelta);
    }
}

export default ObjectDynamics2D;
