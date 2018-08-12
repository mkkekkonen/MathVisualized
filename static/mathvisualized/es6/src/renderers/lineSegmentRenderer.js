import Konva from 'konva';
import { defaultViewportMatrix } from '../util/util';
import { black, strokeWidth } from '../constants/global';
import { addDotToLayer } from '../renderers/dotRenderer';

const addLineSegmentToLayer = ({ line, layer, strokeColor }) => {
    if (line.startPoint && line.endPoint) {
        const screenStartPoint = defaultViewportMatrix.multiplyVector(line.startPoint);
        const screenEndPoint = defaultViewportMatrix.multiplyVector(line.endPoint);
        const konvaLine = new Konva.Line({
            points: [screenStartPoint.x, screenStartPoint.y,
                screenEndPoint.x, screenEndPoint.y],
            stroke: strokeColor || black,
            strokeWidth,
        });
        layer.add(konvaLine);
    }
};

const addLineSegmentMidpointToLayer = ({ line, layer }) => {
    if (line.startPoint && line.endPoint) {
        addDotToLayer({ point: line.midpoint, layer });
    }
};

export { addLineSegmentToLayer, addLineSegmentMidpointToLayer };
