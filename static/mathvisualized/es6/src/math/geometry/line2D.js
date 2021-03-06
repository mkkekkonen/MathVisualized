import Vector3 from '../vector';

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

class Line2D {
    constructor({
        a, b, c, slope, yIntercept, point, type,
    }) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.slope = slope;
        this.yIntercept = yIntercept;
        this.point = point;
        this.type = type;
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
}

export { lineTypes };

export default Line2D;
