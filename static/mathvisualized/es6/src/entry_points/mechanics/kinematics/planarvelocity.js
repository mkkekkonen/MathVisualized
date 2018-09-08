import Konva from 'konva';
import { getDefaultKonvaStage } from '../../../util/util';
import Ship from '../../../objects/ship';
import ObjectKinematics2D from '../../../physics/objectKinematics2D';
import { initializeKeyboardInput } from '../../../input/inputManager';

const stage = getDefaultKonvaStage();
const layer = new Konva.Layer();
stage.add(layer);

const ship = new Ship();
ship.kinematics = new ObjectKinematics2D(ship.location);
layer.add(ship.polygon);

let turningLeft = false;
let turningRight = false;

initializeKeyboardInput(
    (event) => {
        if (event.code === 'ArrowUp') {
            ship.kinematics.accelerationScalar = 1;
        } else if (event.code === 'ArrowDown') {
            ship.kinematics.accelerationScalar = -1;
        }
        if (event.code === 'ArrowLeft') {
            turningLeft = true;
        } else if (event.code === 'ArrowRight') {
            turningRight = true;
        }
    },
    (event) => {
        if (event.code === 'ArrowUp' || event.code === 'ArrowDown') {
            ship.kinematics.accelerationScalar = 0;
        }
        if (event.code === 'ArrowLeft') {
            turningLeft = false;
        }
        if (event.code === 'ArrowRight') {
            turningRight = false;
        }
    },
);

const update = (time) => {
    ship.kinematics.update(time, turningLeft, turningRight);
    ship.updateLocation(ship.kinematics.position);
    ship.updateRotation(ship.kinematics.rotation);
    document.getElementById('output').innerHTML = ship.kinematics.toString();
};

const render = () => {
    layer.draw();
};

let previousTime = new Date().getTime();

window.setInterval(() => {
    const currentTime = new Date().getTime();
    const timeDelta = currentTime - previousTime;
    const timeDeltaSeconds = timeDelta / 1000;
    update(timeDeltaSeconds);
    render();
    previousTime = currentTime;
}, 1000.0 / 60.0);
