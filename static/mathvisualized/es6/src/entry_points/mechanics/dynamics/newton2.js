import Konva from 'konva';
import LineSegment2D from '../../../math/geometry/lineSegment2D';
import * as util from '../../../util/util';
import * as inputManager from '../../../input/inputManager';
import * as lineSegmentRenderer from '../../../renderers/lineSegmentRenderer';
import * as dotRenderer from '../../../renderers/dotRenderer';
import * as constants from '../../../constants/global';
import ObjectDynamics2D from '../../../physics/objectDynamics2D';
import Vector3 from '../../../math/vector';

const stage = util.getDefaultKonvaStage();
const layer = new Konva.Layer();
stage.add(layer);

let forceStartPoint = null;
let forceEndPoint = null;
let dot = null;

const forceLineSegment = new LineSegment2D({
    startPoint: new Vector3(),
    endPoint: new Vector3(),
});

const getForceVector = () => {
    if (forceStartPoint && forceEndPoint) {
        return forceEndPoint.subtract(forceStartPoint);
    }
    return null;
};

const update = (time) => {
    const forceVector = getForceVector();
    const force = forceVector && forceVector.multiply(100);

    if (forceStartPoint && forceEndPoint) {
        forceLineSegment.startPoint = forceStartPoint;
        forceLineSegment.endPoint = forceEndPoint;
    }

    dot.dynamics.update(time, force);
};

const resetForce = () => {
    if (forceStartPoint && forceEndPoint) {
        forceStartPoint = null;
        forceEndPoint = null;
    }
};

const render = () => {
    layer.removeChildren();

    if (forceStartPoint && forceEndPoint) {
        lineSegmentRenderer.addLineSegmentToLayer({
            line: forceLineSegment,
            layer,
        });
    }

    dotRenderer.addDotToLayer({
        point: dot.dynamics.position,
        layer,
    });

    layer.draw();
};

const reset = () => {
    const inputValue = document.getElementById('mass').value;
    const massKg = Number(inputValue) || 10;

    dot = {
        dynamics: new ObjectDynamics2D({
            massKg,
            radius: 0.2,
            constrainToBorders: true,
            willBounce: true,
            worldWidth: constants.worldWidth,
            worldHeight: constants.worldHeight,
        }),
    };
};

let previousTime = new Date().getTime();

stage.on('mousedown', () => {
    forceStartPoint = inputManager.getMouseWorldPosition({ stage });
});

stage.on('touchstart', () => {
    forceStartPoint = inputManager.getMouseWorldPosition({ stage });
});

stage.on('mouseup', () => {
    forceEndPoint = inputManager.getMouseWorldPosition({ stage });
});

stage.on('touchend', () => {
    forceEndPoint = inputManager.getMouseWorldPosition({ stage });
});

reset();

document.getElementById('resetButton').addEventListener('click', reset);

window.setInterval(() => {
    const currentTime = new Date().getTime();
    const timeDelta = currentTime - previousTime;
    const timeDeltaSeconds = timeDelta / 1000;
    update(timeDeltaSeconds);
    render();
    resetForce();
    previousTime = currentTime;
}, 1000.0 / 60.0);
