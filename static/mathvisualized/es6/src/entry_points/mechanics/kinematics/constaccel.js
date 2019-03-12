import * as util from '../../../util/util';
import * as axis2DRenderer from '../../../renderers/axis2DRenderer';
import * as dotRenderer from '../../../renderers/dotRenderer';
import Vector3 from '../../../math/vector';
import TimeKinematics2D from '../../../physics/timeKinematics2D';

const { layer } = util.getDefaultKonvaStage2();
axis2DRenderer.addAxesToLayer(layer);
layer.draw();

let running = false;

const initialPosition = new Vector3();
const initialVelocity = new Vector3();
const acceleration = new Vector3();

const dot = {
    kinematics: new TimeKinematics2D({ initialPosition, initialVelocity, acceleration }),
};

const start = () => {
    const initialVelocityX = parseFloat(document.getElementById('v0x').value) || 0;
    const initialVelocityY = parseFloat(document.getElementById('v0y').value) || 0;
    const _initialVelocity = new Vector3({ x: initialVelocityX, y: initialVelocityY });

    const accelerationX = parseFloat(document.getElementById('ax').value) || 0;
    const accelerationY = parseFloat(document.getElementById('ay').value) || 0;
    const _acceleration = new Vector3({ x: accelerationX, y: accelerationY });

    dot.kinematics.reset({
        initialPosition,
        initialVelocity: _initialVelocity,
        acceleration: _acceleration,
    });

    running = true;
};

const reset = () => {
    running = false;
    dot.kinematics.reset({ initialPosition, initialVelocity, acceleration });
};

document.getElementById('startButton').addEventListener('click', start);
document.getElementById('resetButton').addEventListener('click', reset);

const update = (time) => {
    dot.kinematics.update(time);
};

const render = () => {
    layer.removeChildren();
    axis2DRenderer.addAxesToLayer(layer);
    dotRenderer.addDotToLayer({
        point: dot.kinematics.position,
        layer,
    });
    layer.draw();
    document.getElementById('output').innerHTML = dot.kinematics.toString();
};

let previousTime = new Date().getTime();

window.setInterval(() => {
    const currentTime = new Date().getTime();
    const timeDelta = currentTime - previousTime;
    const timeDeltaSeconds = timeDelta / 1000;
    if (running) {
        update(timeDeltaSeconds);
    }
    render();
    previousTime = currentTime;
}, 1000.0 / 60.0);
