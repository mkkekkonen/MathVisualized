import Konva from 'konva';
import { movieWidth, movieHeight, worldWidth, worldHeight, black, strokeWidth } from '../../../constants/global';
import Vector3 from '../../../math/vector';
import createViewportMatrix, { createReverseViewportMatrix } from '../../../math/viewport';
import { round } from '../../../math/util';

const stage = new Konva.Stage({
    container: document.getElementById('canvas'),
    width: movieWidth,
    height: movieHeight
});

const layer = new Konva.Layer();

stage.add(layer);

const viewportMatrix = createViewportMatrix({
    worldWidth,
    worldHeight,
    screenWidth: movieWidth,
    screenHeight: movieHeight
});

const reverseViewportMatrix = createReverseViewportMatrix({
    worldWidth,
    worldHeight,
    screenWidth: movieWidth,
    screenHeight: movieHeight
});

let previousPoint = null;
let currentPoint = null;

let line = null;

const formatOutput = distance => `Point 1: ${previousPoint.toString()}
Point 2: ${currentPoint.toString()}
Distance: ${round(distance)}`;

const calculateAndOutputDistance = () => {
    let distance = 0;
    if (previousPoint && currentPoint) {
        distance = previousPoint.distanceFrom(currentPoint);
        document.getElementById('output').innerHTML = formatOutput(distance);
    }
    return distance;
};

const drawLine = () => {
    if (previousPoint && currentPoint) {
        const screenPreviousPoint = viewportMatrix.multiplyVector(previousPoint);
        const screenCurrentPoint = viewportMatrix.multiplyVector(currentPoint);
        layer.removeChildren();
        line = new Konva.Line({
            points: [screenPreviousPoint.x, screenPreviousPoint.y, screenCurrentPoint.x, screenCurrentPoint.y],
            stroke: black,
            strokeWidth
        });
        layer.add(line);
        layer.draw();
    }
};

stage.on('click', () => {
    previousPoint = currentPoint;

    const location = stage.getPointerPosition();
    const locationVector = new Vector3({
        x: location.x,
        y: location.y,
        z: 0
    });

    const worldVector = reverseViewportMatrix.multiplyVector(locationVector);

    currentPoint = worldVector;

    calculateAndOutputDistance();
    drawLine();
});