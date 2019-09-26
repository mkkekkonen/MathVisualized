class ColliderWorld {
    constructor() {
    }

    init(colliders) {
        try {
            this.colliderWorld = {};
            colliders.forEach(collider => {
                this.colliderWorld[collider.uid] = collider;
            });
        } catch(e) {
            console.log(e.message);
        }
    }

    checkCollisionsOnUpdate() {
        let collisionKeys = [];
        const alreadyChecked = {};

        if (!this.colliderWorld) {
            return;
        }

        Object.keys(this.colliderWorld).forEach(key => {
            const collider = this.colliderWorld[key];
            collisionKeys = collisionKeys.concat(collider.checkCollision(this.colliderWorld, alreadyChecked));
        });
        return collisionKeys;
    }
}

export default ColliderWorld;
