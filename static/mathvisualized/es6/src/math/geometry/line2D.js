class Line2D {
    constructor({
        slope, point, yIntercept, a, b, c,
    }) {
        this.slope = slope;
        this.point = point;
        this.yIntercept = yIntercept;
        this.a = a;
        this.b = b;
        this.c = c;
    }

    static pointSlope({ slope, point }) {
        return new this({ slope, point });
    }

    static slopeIntercept({ slope, yIntercept }) {
        return new this({ slope, yIntercept });
    }

    static generalFormEquation({ a, b, c }) {
        return new this({ a, b, c });
    }
}

export default Line2D;
