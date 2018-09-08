import Vector3 from '../math/vector';
import { defaultReverseViewportMatrix } from '../util/util';

const updatePointOnClick = ({ point, stage }) => {
    const pointerPosition = stage.getPointerPosition();
    const { x, y } = pointerPosition;
    const positionVector = new Vector3({ x, y, z: 0 });

    const worldVector = defaultReverseViewportMatrix.multiplyVector(positionVector);

    point.x = worldVector.x;
    point.y = worldVector.y;
};

export { updatePointOnClick };
