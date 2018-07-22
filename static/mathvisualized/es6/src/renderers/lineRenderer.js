import Konva from 'konva';
import { defaultViewportMatrix } from '../util/util';
import { black, red, strokeWidth, dotRadius } from '../constants/global';

const addLineToLayer = ({ line, layer }) => {
    if (line.startPoint && line.endPoint) {
        const screenStartPoint = defaultViewportMatrix.multiplyVector(line.startPoint);
        const screenEndPoint = defaultViewportMatrix.multiplyVector(line.endPoint);
        const konvaLine = new Konva.Line({
            points: [screenStartPoint.x, screenStartPoint.y,
                screenEndPoint.x, screenEndPoint.y],
            stroke: black,
            strokeWidth,
        });
        layer.add(konvaLine);
    }
};

const addLineMidpointToLayer = ({ line, layer }) => {
    if (line.startPoint && line.endPoint) {
        const midpointVector = line.midpoint;
        const screenMidpoint = defaultViewportMatrix.multiplyVector(midpointVector);
        const { x, y } = screenMidpoint;
        const midpointCircle = new Konva.Circle({
            x,
            y,
            radius: dotRadius,
            fill: red,
        });
        layer.add(midpointCircle);
    }
};

export { addLineToLayer, addLineMidpointToLayer };

