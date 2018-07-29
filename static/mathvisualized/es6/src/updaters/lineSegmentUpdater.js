import Vector3 from '../math/vector';
import { defaultReverseViewportMatrix } from '../util/util';

const updateLineOnClick = ({
    line, stage,
}) => {
    line.startPoint = line.endPoint;

    const location = stage.getPointerPosition();
    const locationVector = new Vector3({
        x: location.x,
        y: location.y,
        z: 0,
    });

    const worldVector = defaultReverseViewportMatrix.multiplyVector(locationVector);

    line.endPoint = worldVector;
};

export { updateLineOnClick };
