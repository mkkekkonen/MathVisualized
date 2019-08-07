/* eslint-disable no-cond-assign */
import AbstractPhysics2D from './abstractPhysics2D';
import ObjectKinematics2D from './objectKinematics2D';
import Vector3 from '../math/vector';
import { sides } from '../constants/global';
import * as util from '../util/util';

class ObjectDynamics2D extends AbstractPhysics2D {
    constructor({
        position,
        massKg,
        constrainToBorders,
        radius,
        willBounce,
        rectCollider,
        worldWidth,
        worldHeight,
    }) {
        super();
        this.position = position || new Vector3();

        if (!massKg && massKg !== 0) {
            throw new Error('No mass specified!');
        }

        this.mass = massKg;
        this.kinematics = new ObjectKinematics2D(position);
        this.velocity = new Vector3();

        this.constrainToBorders = constrainToBorders;
        this.radius = radius;
        this.rectCollider = rectCollider;
        this.willBounce = willBounce;
        this.worldWidth = worldWidth;
        this.worldHeight = worldHeight;
    }

    get widthHalved() {
        if ((this.radius !== undefined) && (this.radius !== null)) {
            return this.radius / 2;
        } else if (this.rectCollider) {
            return this.rectCollider.width / 2;
        }
        return 0;
    }

    get heightHalved() {
        if ((this.radius !== undefined) && (this.radius !== null)) {
            return this.radius / 2;
        } else if (this.rectCollider) {
            return this.rectCollider.height / 2;
        }
        return 0;
    }

    update(time, force) {
        const acceleration = force
            ? force.divide(this.mass)
            : new Vector3();

        const velocityDelta = acceleration.multiply(time);
        this.velocity = this.velocity.add(velocityDelta);

        const positionDelta = this.velocity.multiply(time);
        this.position = this.position.add(positionDelta);
        if (this.rectCollider) {
            this.rectCollider.center = this.position;
        }

        if (this.constrainToBorders && this.willBounce) {
            this.bounce();
        } else if (this.constrainToBorders && !this.willBounce) {
            this.stopOnBorder();
        }
    }

    hasCrossedBorder() {
        const crossedSideKey = Object.keys(sides)
            .find(key => util.hasCrossedBorder({
                side: sides[key],
                position: this.position,
                radius: this.radius,
                rect: this.rectCollider,
                worldWidth: this.worldWidth,
                worldHeight: this.worldHeight,
            }));

        return sides[crossedSideKey];
    }

    bounce() {
        let crossedSide;
        let loopGuard = 0;
        while ((crossedSide = this.hasCrossedBorder()) && loopGuard < 2) {
            loopGuard += 1;
            switch (crossedSide) {
            case sides.TOP: {
                if (this.velocity.y > 0) {
                    this.velocity.y = -this.velocity.y;
                    this.position = util.getBouncedPosition({
                        side: sides.TOP,
                        position: this.position,
                        radius: this.radius,
                        rect: this.rectCollider,
                        worldWidth: this.worldWidth,
                        worldHeight: this.worldHeight,
                    });
                }
                break;
            }
            case sides.RIGHT: {
                if (this.velocity.x > 0) {
                    this.velocity.x = -this.velocity.x;
                    this.position = util.getBouncedPosition({
                        side: sides.RIGHT,
                        position: this.position,
                        radius: this.radius,
                        rect: this.rectCollider,
                        worldWidth: this.worldWidth,
                        worldHeight: this.worldHeight,
                    });
                }
                break;
            }
            case sides.BOTTOM: {
                if (this.velocity.y < 0) {
                    this.velocity.y = -this.velocity.y;
                    this.position = util.getBouncedPosition({
                        side: sides.BOTTOM,
                        position: this.position,
                        radius: this.radius,
                        rect: this.rectCollider,
                        worldWidth: this.worldWidth,
                        worldHeight: this.worldHeight,
                    });
                }
                break;
            }
            case sides.LEFT: {
                if (this.velocity.x < 0) {
                    this.velocity.x = -this.velocity.x;
                    this.position = util.getBouncedPosition({
                        side: sides.LEFT,
                        position: this.position,
                        radius: this.radius,
                        rect: this.rectCollider,
                        worldWidth: this.worldWidth,
                        worldHeight: this.worldHeight,
                    });
                }
                break;
            }
            default:
                break;
            }
        }
    }

    stopOnBorder() {
        let crossedSide;
        while (crossedSide = this.hasCrossedBorder()) {
            switch(crossedSide) {
                case sides.TOP: {
                    this.velocity.y = 0;
                    this.position.y = (this.worldHeight / 2) - this.heightHalved;
                    break;
                }
                case sides.RIGHT: {
                    this.velocity.x = 0;
                    this.position.x = (this.worldWidth / 2) - this.widthHalved;
                    break;
                }
                case sides.BOTTOM: {
                    this.velocity.y = 0;
                    this.position.y = -(this.worldHeight / 2) + this.heightHalved;
                    break;
                }
                case sides.LEFT: {
                    this.velocity.x = 0;
                    this.position.x = -(this.worldWidth / 2) + this.widthHalved;
                    break;
                }
                default:
                    break;
            }
        }
    }
}

export default ObjectDynamics2D;
