class AbstactObject2D {
    constructor(location) {
        this.location = location;
    }

    update(timeDeltaSeconds) {
        throw new Error('The method "update" must be implemented!');
    }

    render() {
        throw new Error('The method "render" must be implemented!');
    }
}

export default AbstactObject2D;