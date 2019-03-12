import AbstractKinematics2D from './abstractKinematics2D';
import Vector3 from '../math/vector';
import { round } from '../math/util';

class TimeKinematics2D extends AbstractKinematics2D {
    constructor({ initialPosition, initialVelocity, acceleration }) {
        super();
        this.reset({ initialPosition, initialVelocity, acceleration });
    }

    reset({ initialPosition, initialVelocity, acceleration }) {
        this.initialPosition = initialPosition;
        this.position = initialPosition || new Vector3({ x: 0, y: 0, z: 0 });

        this.initialVelocity = initialVelocity;
        this.velocity = initialVelocity;

        this.acceleration = acceleration;

        this.totalTime = 0;
    }

    update(time) {
        this.totalTime += time;

        const x = (this.initialVelocity.x * this.totalTime)
            + (0.5 * this.acceleration.x * (this.totalTime ** 2));
        const y = (this.initialVelocity.y * this.totalTime)
            + (0.5 * this.acceleration.y * (this.totalTime ** 2));
        this.position = new Vector3({ x, y });

        const vx = this.initialVelocity.x
            + (this.acceleration.x * this.totalTime);
        const vy = this.initialVelocity.y
            + (this.acceleration.y * this.totalTime);
        this.velocity = new Vector3({ x: vx, y: vy });
    }

    toString() {
        let str = 'TimeKinematics2D\n';
        str += `~ position: (${round(this.position.x)}, ${round(this.position.y)})\n`;
        str += `~ velocity: (${round(this.velocity.x)}, ${round(this.velocity.y)})\n`;
        str += `~ acceleration: (${round(this.acceleration.x)}, ${round(this.acceleration.y)})`;
        return str;
    }
}

export default TimeKinematics2D;
