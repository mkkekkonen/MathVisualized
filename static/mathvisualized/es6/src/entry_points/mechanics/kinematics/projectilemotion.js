import Konva from 'konva';
import * as util from '../../../util/util';
import * as lineSegmentUpdater from '../../../updaters/lineSegmentUpdater';
import * as axis2DRenderer from '../../../renderers/axis2DRenderer';
import * as lineSegmentRenderer from '../../../renderers/lineSegmentRenderer';
import * as dotRenderer from '../../../renderers/dotRenderer';
import * as inputManager from '../../../input/inputManager';
import Vector3 from '../../../math/vector';
import LineSegment2D from '../../../math/geometry/lineSegment2D';
import { worldWidth } from '../../../constants/global';
import ProjectileKinematics2D from '../../../physics/projectileKinematics2D';

const { stage, layer } = util.getDefaultKonvaStage2();
axis2DRenderer.addAxesToLayer(layer);

layer.draw();

let running = false;

const initialPosition = new Vector3({ x: -worldWidth / 2, y: 0, z: 0 });
const lineSegment = new LineSegment2D({
    startPoint: initialPosition,
    endPoint: new Vector3(),
});

const dot = {
    kinematics: new ProjectileKinematics2D({
        initialPosition,
        initialVelocity: new Vector3(),
    }),
};

const displacement = new Vector3({ x: 5 });

const start = () => {
    const mouseVector = inputManager.getMouseWorldPosition({ stage });
    const initialVelocity = mouseVector.add(displacement);

    dot.kinematics.reset({
        initialPosition,
        initialVelocity,
    });

    running = true;
};

const reset = () => {
    running = false;
    dot.kinematics.reset({
        initialPosition,
        initialVelocity: new Vector3(),
    });
};

const update = (time) => {
    if (running) {
        dot.kinematics.update(time);
    }

    lineSegmentUpdater.updateLineFixedStart({
        line: lineSegment,
        stage,
    });
};

const render = () => {
    layer.removeChildren();
    axis2DRenderer.addAxesToLayer(layer);
    lineSegmentRenderer.addLineSegmentToLayer({
        line: lineSegment,
        layer,
    });
    dotRenderer.addDotToLayer({
        point: dot.kinematics.position,
        layer,
    });
    layer.draw();
    document.getElementById('output').innerHTML = JSON.stringify(dot.kinematics);
};

const handleClickTap = () => {
    if (running) {
        reset();
    }
    start();
};

let previousTime = new Date().getTime();

document.getElementById('resetButton').addEventListener('click', reset);

stage.on('click', handleClickTap);
stage.on('tap', handleClickTap);

window.setInterval(() => {
    const currentTime = new Date().getTime();
    const timeDelta = currentTime - previousTime;
    const timeDeltaSeconds = timeDelta / 1000;
    update(timeDeltaSeconds);
    render();
    previousTime = currentTime;
}, 1000.0 / 60.0);
