import AbstractKinematics2D from './abstractKinematics2D';
import Vector3 from '../math/vector';
import { accelerationGravity } from '../constants/global';

class ProjectileKinematics2D extends AbstractKinematics2D {
    constructor({ initialPosition, initialVelocity }) {
        super();
        this.reset({ initialPosition, initialVelocity });
    }

    reset({ initialPosition, initialVelocity }) {
        this.initialPosition = initialPosition;
        this.position = initialPosition || new Vector3({ x: 0, y: 0, z: 0 });

        this.initialVelocity = initialVelocity;
        this.velocity = initialVelocity;

        this.totalTime = 0;
    }

    update(time) {
        this.totalTime += time;

        const x = this.initialPosition.x + (this.initialVelocity.x * this.totalTime);

        const y = this.initialPosition.y
            + (this.initialVelocity.y * this.totalTime)
            + (0.5 * accelerationGravity.y *
                (this.totalTime ** 2));

        this.position = new Vector3({ x, y });
    }
}

export default ProjectileKinematics2D;
