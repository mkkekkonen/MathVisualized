import Konva from 'konva';

import AbstractObject2D from './abstractObject2D';
import { defaultScalingFactor } from '../constants/global';
import ObjectDynamics2D from '../physics/objectDynamics2D';
import Vector3 from '../math/vector';
import Rect2D from '../math/geometry/rect2D';
import * as constants from '../constants/global';

class Block2D extends AbstractObject2D {
    constructor({
        location,
        width,
        height,
        useCollider,
        massKg = 10,
        fill = '#333',
        scalingFactor = defaultScalingFactor,
        constrainToBorders = false,
        willBounce = false,
        worldWidth = constants.worldWidth,
        worldHeight = constants.worldHeight,
    }) {
        super(location);
        this.width = width;
        this.height = height;
        this.fill = fill;
        this.scalingFactor = scalingFactor;

        const collider = new Rect2D({
            center: this.location,
            width,
            height,
        });

        this.physics = new ObjectDynamics2D({
            position: this.location,
            massKg,
            rectCollider: collider,
            constrainToBorders,
            willBounce,
            worldWidth,
            worldHeight,
        });
    }

    update(timeDeltaSeconds, force) {
        this.physics.update(timeDeltaSeconds, force);
        this.location = this.physics.position;
    }

    render(layer, viewportMatrix) {
        if (!this.shape) {
            return;
        }

        const adjustedLocation = new Vector3({
            x: this.location.x - (this.width / 2),
            y: this.location.y + (this.height / 2),
        });

        const locationPx = viewportMatrix.multiplyVector(adjustedLocation);
        this.shape.setAttr('x', locationPx.x);
        this.shape.setAttr('y', locationPx.y);

        layer.add(this.shape);
    }

    initializeShape(layer, viewportMatrix) {
        const locationPx = viewportMatrix.multiplyVector(this.location);
        const scaledWidth = this.width * this.scalingFactor;
        const scaledHeight = this.height * this.scalingFactor;

        this.shape = new Konva.Rect({
            x: locationPx.x,
            y: locationPx.y,
            width: scaledWidth,
            height: scaledHeight,
            fill: this.fill,
        });

        layer.add(this.shape);
    }
}

export default Block2D;