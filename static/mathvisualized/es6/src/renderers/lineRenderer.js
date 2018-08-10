import Konva from 'konva';
import { defaultViewportMatrix } from '../util/util';
import { black, strokeWidth, worldHeight } from '../constants/global';
import Vector3 from '../math/vector';
import { lineTypes } from '../math/geometry/line2D';

// return the y coordinate calculated with the point-slope equation
const pointSlope = ({ x, point, slope }) => (slope * (x - point.x)) + point.y;

const generalEquation = ({ x, a, b, c }) => ((-a * x) - c) / b;

const plotVerticalLine = ({ line, layer }) => {
    const { point } = line;
    const { x } = point;
    const startYCoordinate = -(worldHeight / 2);
    const endYCoordinate = worldHeight / 2;
    const segmentStartPoint = defaultViewportMatrix.multiplyVector(
        new Vector3({ x, y: startYCoordinate, z: 0 }),
    );
    const segmentEndPoint = defaultViewportMatrix.multiplyVector(
        new Vector3({ x, y: endYCoordinate, z: 0 }),
    );

    const konvaLine = new Konva.Line({
        points: [segmentStartPoint.x, segmentStartPoint.y,
            segmentEndPoint.x, segmentEndPoint.y],
        stroke: black,
        strokeWidth,
    });
    layer.add(konvaLine);
};

const calculateY = ({ line, x }) => {
    const { a, b, c, slope, point } = line;
    switch (line.type) {
    case lineTypes.POINT_SLOPE:
        return pointSlope({ x, point, slope });
    case lineTypes.GENERAL:
    default:
        return generalEquation({ x, a, b, c });
    }
}

const plotLine = ({ line, layer, worldWidth }) => {
    const { a, b, c, slope, point } = line;
    const startXCoordinate = -(worldWidth / 2);
    const endXCoordinate = worldWidth / 2;
    const konvaLines = [];

    for (let x = startXCoordinate; x < endXCoordinate; x++) {
        const y = calculateY({ line, x });
        const segmentStartPoint = defaultViewportMatrix.multiplyVector(
            new Vector3({ x, y, z: 0 }),
        );

        const nextX = x + 1;
        const nextY = calculateY({ line, x: nextX });
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
};

const plotPointSlopeLine = ({ line, layer, worldWidth }) => {
    const { slope, point } = line;
    if ((slope || Number.isNaN(slope)) && point) {
        if (Number.isNaN(slope)) {
            plotVerticalLine({ line, layer });
        } else {
            plotLine({ line, layer, worldWidth });
        }
    }
};

const plotGeneralFormLine = ({ line, layer, worldWidth }) => {
    const { a, b } = line;
    if (a === 0 && b === 0) {
        // do nothing
    } else if (b === 0) {
        plotVerticalLine({ line, layer });
    } else {
        plotLine({ line, layer, worldWidth });
    }
}

export { plotPointSlopeLine, plotGeneralFormLine };
