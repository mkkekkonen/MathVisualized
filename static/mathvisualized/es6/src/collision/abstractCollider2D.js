import uuidv4 from 'uuid/v4';
import * as util from '../util/util';
import { COLLISION, NO_COLLISION } from '../constants/global';

class AbstractCollider2D {
    constructor(location) {
        this.location = location;
        this.uid = uuidv4();
    }

    checkCollision(colliderWorld, callback, alreadyChecked) {
        const collidedKeys = Object.keys(colliderWorld).filter(uid => {
            if (uid === this.uid) {
                return false;
            }

            const checkedKey = util.getCheckedCollidersKey(this.uid, uid);
            
            const collider = colliderWorld[uid];

            if (!collider) {
                return false;
            }

            const collides = callback(collider);

            return collides;
        });

        return collidedKeys;
    }

    update(time, { location }) {
        this.location = location;
    }
}

export default AbstractCollider2D;
