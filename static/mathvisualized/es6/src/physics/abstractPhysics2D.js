/* eslint-disable class-methods-use-this */

class AbstractPhysics2D {
    update() {
        throw new Error('The method "update" must be implemented!');
    }
}

export default AbstractPhysics2D;
