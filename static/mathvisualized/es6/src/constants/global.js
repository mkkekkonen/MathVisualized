import Vector3 from '../math/vector';

const worldWidth = 10;
const worldHeight = 10;
const movieWidth = 480;
const movieHeight = 480;

const black = '#000';
const darkGrey = '#999';
const red = '#f00';

const strokeWidth = 2;
const dotRadius = 4;

const accelerationGravity = new Vector3({ x: 0, y: -9.81, z: 0 });

export {
    worldWidth, worldHeight,
    movieWidth, movieHeight,
    black, darkGrey, red,
    strokeWidth, dotRadius,
    accelerationGravity,
};
