class Rect2D {
    constructor({
        center, width, height,
    }) {
        this.center = center;
        this.width = width;
        this.height = height;
    }

    get top() {
        return this.center.y + (this.height / 2);
    }

    get right() {
        return this.center.x + (this.width / 2);
    }

    get bottom() {
        return this.center.y - (this.height / 2);
    }

    get left() {
        return this.center.x - (this.width / 2);
    }

    collidesWithAABB(other) {
        return (
            this.left < other.right
                && this.right > other.left
                && this.bottom < other.top
                && this.top > other.bottom
        );
    }
}

export default Rect2D;
