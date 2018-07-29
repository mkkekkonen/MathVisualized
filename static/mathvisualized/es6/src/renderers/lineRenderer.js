import Konva from 'konva';
import { defaultViewportMatrix } from '../util/util';
import { black, strokeWidth } from '../constants/global';
import Vector3 from '../math/vector';

// return the y coordinate calculated with the point-slope equation
const pointSlope = ({ x, point, slope }) => (slope * (x - point.x)) + point.y;

const plotPointSlopeLine = ({ line, layer, worldWidth }) => {
    // point - the point through which the line goes
    const { slope, point } = line;
    if (slope && point) {
        const startXCoordinate = -(worldWidth / 2);
        const endXCoordinate = worldWidth / 2;
        const konvaLines = [];
        for (let x = startXCoordinate; x < endXCoordinate; x++) {
            const y = pointSlope({ x, point, slope });
            const segmentStartPoint = defaultViewportMatrix.multiplyVector(
                new Vector3({ x, y, z: 0 }),
            );

            const nextX = x + 1;
            const nextY = pointSlope({ x: nextX, point, slope });
            const segmentEndPoint = defaultViewportMatrix.multiplyVector(
                new Vector3({ x: nextX, y: nextY, z: 0 }),
            );

            const konvaLine = new Konva.Line({
                points: [segmentStartPoint.x, segmentStartPoint.y,
                    segmentEndPoint.x, segmentEndPoint.y],
                stroke: black,
                strokeWidth,
            });
            konvaLines.push(konvaLine);
            layer.add(konvaLine);
        }
    }
};

export { plotPointSlopeLine };
