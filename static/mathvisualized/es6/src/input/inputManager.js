import Vector3 from '../math/vector';
import { defaultReverseViewportMatrix } from '../util/util';

const initializeKeyboardInput = (keyDownCallback, keyUpCallback) => {
    window.addEventListener('keydown', keyDownCallback);
    window.addEventListener('keyup', keyUpCallback);
};

const getMouseWorldPosition = ({ stage }) => {
    const pointerPosition = stage.getPointerPosition();
    const { x, y } = pointerPosition;
    const positionVector = new Vector3({ x, y });

    return defaultReverseViewportMatrix.multiplyVector(positionVector);
};

export { initializeKeyboardInput, getMouseWorldPosition };
