import AbstractCollider2D from './abstractCollider2D';
import Rect2D from '../math/geometry/rect2D';

class RectCollider2D extends AbstractCollider2D {
    constructor(location, width, height) {
        super(location);
        this.rectCollider = new Rect2D({
            center: location,
            width,
            height,
        });
    }

    checkCollisionCallback(collider) {
        if (typeof collider !== RectCollider2D) {
            return false;
        }

        return this.rectCollider.collidesWithAABB(collider.rectCollider);
    }

    checkCollision(colliderWorld, alreadyChecked) {
        return super.checkCollision(colliderWorld, this.checkCollisionCallback, alreadyChecked);
    }

    update(time, { location }) {
        super.update(time, { location });
    }
}

export default RectCollider2D;
