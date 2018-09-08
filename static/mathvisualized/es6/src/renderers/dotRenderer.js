import Konva from 'konva';
import { dotRadius, red } from '../constants/global';
import { defaultViewportMatrix } from '../util/util';

const addDotToLayer = ({ point, radius, layer, fillColor }) => {
    const screenPoint = defaultViewportMatrix.multiplyVector(point);
    const { x, y } = screenPoint;
    const circle = new Konva.Circle({
        x,
        y,
        radius: radius || dotRadius,
        fill: fillColor || red,
    });
    layer.add(circle);
};

export { addDotToLayer };
