class AbstactObject2D {
    constructor(location) {
        this._location = location;
        this.physics = undefined;
    }

    get location() {
        if (this.physics) {
            return this.physics.position;
        }
        return this._location;
    }

    update(timeDeltaSeconds) {
        throw new Error('The method "update" must be implemented!');
    }

    render() {
        throw new Error('The method "render" must be implemented!');
    }
}

export default AbstactObject2D;
