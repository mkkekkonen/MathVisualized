const lineTypes = {
    GENERAL: 'GENERAL',
    SLOPE_INTERCEPT: 'SLOPE_INTERCEPT',
    POINT_SLOPE: 'POINT_SLOPE',
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
}

export { lineTypes };

export default Line2D;
