import Konva from 'konva';

import Vector3 from '../vector';
import {
    black,
    strokeWidth as defaultStrokeWidth,
    worldWidth as defaultWorldWidth,
    worldHeight as defaultWorldHeight,
} from '../../constants/global';
import { defaultViewportMatrix } from '../../util/util';

const lineTypes = {
    GENERAL: 'GENERAL',
    SLOPE_INTERCEPT: 'SLOPE_INTERCEPT',
    POINT_SLOPE: 'POINT_SLOPE',
};

const solveSystem = (line1, line2) => {
    if (line1.type !== line2.type) {
        return null;
    }

    if (line1.slope && line1.yIntercept && line2.slope && line2.yIntercept) {
        if (line1.slope === line2.slope && line1.yIntercept === line2.yIntercept) {
            return true;
        } else if (line1.slope === line2.slope && line1.yIntercept !== line2.yIntercept) {
            return null;
        }

        switch (line1.type) {
        case lineTypes.SLOPE_INTERCEPT:
        default: {
            const xFactor = line1.slope - line2.slope;
            const constant = line2.yIntercept - line1.yIntercept;
            const x = constant / xFactor;

            const y = (line1.slope * x) + line1.yIntercept;

            return new Vector3({ x, y, z: 0 });
        }
        }
    }
    return null;
};

const pointSlopeY = ({ x, point, slope }) => (slope * (x - point.x)) + point.y;

const generalEquationY = ({ x, a, b, c }) => ((-a * x) - c) / b;

const slopeInterceptY = ({ x, slope, yIntercept }) => (slope * x) + yIntercept;

class Line2D {
    constructor({
        a, b, c,
        slope, yIntercept,
        point,
        type,
        strokeColor = black,
        strokeWidth = defaultStrokeWidth,
    }) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.slope = slope;
        this.yIntercept = yIntercept;
        this.point = point;
        this.type = type;
        this.strokeColor = strokeColor;
        this.strokeWidth = strokeWidth;
    }

    static general({ a, b, c }) {
        return new this({ a, b, c, type: lineTypes.GENERAL });
    }

    static slopeIntercept({ slope, yIntercept }) {
        return new this({ slope, yIntercept, type: lineTypes.SLOPE_INTERCEPT });
    }

    static pointSlope({ slope, point }) {
        return new this({ slope, point, type: lineTypes.POINT_SLOPE });
    }

    static calculatePerpendicularSlope(slope) {
        return -(1 / slope);
    }

    updatePointSlope({ point, slope }) {
        this.point = point;
        this.slope = slope;
    }

    renderPointSlope({
        layer,
        worldWidth = defaultWorldWidth,
        worldHeight = defaultWorldHeight,
        viewportMatrix = defaultViewportMatrix,
    }) {
        if ((this.slope || this.slope === 0 || Number.isNaN(this.slope)) && this.point) {
            if (Number.isNaN(this.slope)) {
                this.plotVerticalLine({ layer, worldHeight, viewportMatrix });
            } else {
                this.plotLine({ layer, worldWidth, viewportMatrix });
            }
        }
    }

    intersects(line) {
        return solveSystem(this, line);
    }

    angleBetween(line) {
        if (this.type !== line.type) {
            return 0;
        }
        switch (this.type) {
        case lineTypes.SLOPE_INTERCEPT:
        default: {
            const tangent = Math.abs(
                (this.slope - line.slope) /
                (1 - (this.slope * line.slope)),
            );
            return Math.atan(tangent);
        }
        }
    }

    calculateSlope() {
        if ((this.type === lineTypes.POINT_SLOPE
                || this.type === lineTypes.SLOPE_INTERCEPT)
                && this.slope) {
            return this.slope;
        } else if (this.type === lineTypes.GENERAL) {
            return -(this.a / this.b);
        }
        return null;
    }

    convertToYIntercept() {
        switch (this.type) {
        case lineTypes.GENERAL: {
            return Line2D.slopeIntercept({
                slope: -(this.a / this.b),
                yIntercept: -(this.c / this.b),
            });
        }
        case lineTypes.POINT_SLOPE: {
            return Line2D.slopeIntercept({
                slope: this.slope,
                yIntercept: -(this.slope * this.point.x) + this.point.y,
            });
        }
        case lineTypes.SLOPE_INTERCEPT:
        default:
            return this;
        }
    }

    calculateY(x) {
        switch (this.type) {
        case lineTypes.POINT_SLOPE:
            return pointSlopeY({ x, point: this.point, slope: this.slope });
        case lineTypes.SLOPE_INTERCEPT:
            return slopeInterceptY({ x, slope: this.slope, yIntercept: this.yIntercept });
        case lineTypes.GENERAL:
        default:
            return generalEquationY({ x, a: this.a, b: this.b, c: this.c });
        }
    };

    plotLine({ layer, worldWidth, viewportMatrix = defaultViewportMatrix }) {
        const startXCoordinate = -(worldWidth / 2);
        const endXCoordinate = worldWidth / 2;
        this.konvaLines = [];
    
        for (let x = startXCoordinate; x < endXCoordinate; x++) {
            const y = this.calculateY(x);
            const segmentStartPoint = viewportMatrix.multiplyVector(
                new Vector3({ x, y, z: 0 }),
            );
    
            const nextX = x + 1;
            const nextY = this.calculateY(nextX);
            const segmentEndPoint = viewportMatrix.multiplyVector(
                new Vector3({ x: nextX, y: nextY, z: 0 }),
            );
    
            const konvaLine = this.plotKonvaLineSegment({
                layer,
                segmentStartPoint,
                segmentEndPoint
            });
            this.konvaLines.push(konvaLine);
        }
    };

    plotVerticalLine({ layer, worldHeight, viewportMatrix }) {
        const { x } = this.point;
        this.konvaLines = [];

        const startYCoordinate = -(worldHeight / 2);
        const endYCoordinate = worldHeight / 2;
        const segmentStartPoint = viewportMatrix.multiplyVector(
            new Vector3({ x, y: startYCoordinate, z: 0 }),
        );
        const segmentEndPoint = viewportMatrix.multiplyVector(
            new Vector3({ x, y: endYCoordinate, z: 0 }),
        );
    
        const konvaLine = this.plotKonvaLineSegment({
            layer,
            segmentStartPoint,
            segmentEndPoint,
        });
        this.konvaLines.push(konvaLine);
    }

    plotKonvaLineSegment({ layer, segmentStartPoint, segmentEndPoint }) {
        const konvaLine = new Konva.Line({
            points: [segmentStartPoint.x, segmentStartPoint.y,
                segmentEndPoint.x, segmentEndPoint.y],
            stroke: this.strokeColor,
            strokeWidth: this.strokeWidth,
        });
        layer.add(konvaLine);
        return konvaLine;
    }
}

export { lineTypes };

export default Line2D;
