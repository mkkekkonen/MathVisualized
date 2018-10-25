import Vector3 from '../math/vector';
import { defaultReverseViewportMatrix } from '../util/util';

const updateLineOnClick = ({ line, stage }) => {
    line.startPoint = line.endPoint;

    const pointerPosition = stage.getPointerPosition();
    const { x, y } = pointerPosition;
    const positionVector = new Vector3({ x, y, z: 0 });

    const worldVector = defaultReverseViewportMatrix.multiplyVector(positionVector);

    line.endPoint = worldVector;
};

export { updateLineOnClick };