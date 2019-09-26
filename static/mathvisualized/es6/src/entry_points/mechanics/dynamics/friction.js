import Konva from 'konva';

import * as util from '../../../util/util';
import * as lineRenderer from '../../../renderers/lineRenderer';
import * as lineSegmentRenderer from '../../../renderers/lineSegmentRenderer';
import * as constants from '../../../constants/global';
import Line2D, { lineTypes } from '../../../math/geometry/line2D';
import LineSegment2D from '../../../math/geometry/lineSegment2D';
import ColliderWorld from '../../../collision/colliderWorld';
import Vector3 from '../../../math/vector';
import Block2D from '../../../objects/block2D';

const LEFT = 'LEFT';
const RIGHT = 'RIGHT';

const { stage, layer } = util.getDefaultKonvaStage2();

let force = new Vector3();
const gravitationalForce = constants.accelerationGravity.multiply(10); // G = mg

const horizon = new Line2D({
    type: lineTypes.SLOPE_INTERCEPT,
    slope: 0,
    yIntercept: -2.5,
});

const block = new Block2D({
    location: new Vector3(),
    width: 2,
    height: 1,
    useCollider: true,
    constrainToBorders: true,
});

const staticBlock = new Block2D({
    location: new Vector3({ y: -4 }),
    width: 1,
    height: 2,
    useCollider: true,
});

const forceLineSegment = new LineSegment2D({
    startPoint: undefined,
    endPoint: undefined,
});

const colliderWorld = new ColliderWorld();
colliderWorld.init([block.collider, staticBlock.collider]);

let collidedKeys = [];

const determineClickSide = clickVector => {
    if (clickVector.x < block.location.x) {
        return LEFT;
    }
    return RIGHT;
};

const getBlockEndVector = side => {
    switch (side) {
        case LEFT: {
            return new Vector3({
                x: block.location.x - (block.width / 2),
                y: block.location.y,
                z: 0,
            });
        }
        case RIGHT:
        default: {
            return new Vector3({
                x: block.location.x + (block.width / 2),
                y: block.location.y,
                z: 0,
            });
        }
    }
};

const getClickVector = event => {
    const clickVectorPx = new Vector3({ x: event.evt.layerX, y: event.evt.layerY, z: 0 });
    return util.defaultReverseViewportMatrix.multiplyVector(clickVectorPx);
}

const update = timeDeltaSeconds => {
    collidedKeys = colliderWorld.checkCollisionsOnUpdate();
    block.update(timeDeltaSeconds, force.multiply(100).add(gravitationalForce)); // kN
    if (!force.isAllZeros) {
        force = new Vector3();
    }
};

const render = () => {
    layer.removeChildren();

    lineRenderer.plotSlopeInterceptLine({
        line: horizon,
        layer,
        worldWidth: constants.worldWidth,
        strokeColor: '#000',
    });

    const blockFill = collidedKeys.includes(block.collider.uid) ? '#a00' : '#000';

    block.render(layer, util.defaultViewportMatrix, { fill: blockFill });
    staticBlock.render(layer, util.defaultViewportMatrix);

    if (forceLineSegment.startPoint && forceLineSegment.endPoint) {
        lineSegmentRenderer.addLineSegmentToLayer({
            line: forceLineSegment,
            layer,
            strokeColor: '#000',
        });
    }

    layer.draw();
};

const postRender = () => {
    forceLineSegment.startPoint = null;
    forceLineSegment.endPoint = null;
};

let previousTime = new Date().getTime();

stage.on('click', event => {
    console.log(event);
    const clickVector = getClickVector(event);
    const side = determineClickSide(clickVector);
    const blockEndVector = getBlockEndVector(side);
    forceLineSegment.startPoint = blockEndVector;
    forceLineSegment.endPoint = clickVector;
    force = clickVector.subtract(blockEndVector);
});

block.initializeShape(layer, util.defaultViewportMatrix);
staticBlock.initializeShape(layer, util.defaultViewportMatrix);

window.setInterval(() => {
    const currentTime = new Date().getTime();
    const timeDelta = currentTime - previousTime;
    const timeDeltaSeconds = timeDelta / 1000;
    update(timeDeltaSeconds);
    render();
    postRender();
    previousTime = currentTime;
}, 1000.0 / 60.0);
