import { worldWidth, worldHeight, movieWidth, movieHeight } from '../constants/quadraticequation';
import Vector3 from '../math/vector';
import createViewportMatrix from '../math/viewport';

const strokeColor = '#000';
const strokeWidth = 2;

const dummyEquation = 'y = x^2 + 4x - 2';

stage.setBackgroundColor('#ccc');

const viewportMatrix = createViewportMatrix({
    worldWidth,
    worldHeight,
    screenWidth: movieWidth,
    screenHeight: movieHeight
});

let xStart = new Vector3({ x: -5, y: 0, z: 0 });
xStart = viewportMatrix.multiplyVector(xStart);

let xEnd = new Vector3({ x: 5, y: 0, z: 0 });
xEnd = viewportMatrix.multiplyVector(xEnd);

const xAxis = new Path();
xAxis.moveTo(xStart.x, xStart.y).lineTo(xEnd.x, xEnd.y);
xAxis.attr('strokeColor', strokeColor);
xAxis.attr('strokeWidth', strokeWidth);
xAxis.addTo(stage);

let yStart = new Vector3({ x: 0, y: -5, z: 0 });
yStart = viewportMatrix.multiplyVector(yStart);

let yEnd = new Vector3({ x: 0, y: 5, z: 0 });
yEnd = viewportMatrix.multiplyVector(yEnd);

const yAxis = new Path();
yAxis.moveTo(yStart.x, yStart.y).lineTo(yEnd.x, yEnd.y);
yAxis.attr('strokeColor', strokeColor);
yAxis.attr('strokeWidth', strokeWidth);
yAxis.addTo(stage);

let curve = null;

const plotCurve = ({ a, b, c }) => {
    if (curve) {
        curve.remove();
        curve = null;
    }

    curve = new Path();

    for (let x = -5; x <= 5; x += 0.1) {
        const y = a * x * x + b * x + c;

        let coords = new Vector3({ x, y, z: 0 });
        coords = viewportMatrix.multiplyVector(coords);

        if (x === -5) {
            curve.moveTo(coords.x, coords.y);
        } else {
            curve.lineTo(coords.x, coords.y);
        }
    }

    curve.attr('strokeColor', strokeColor);
    curve.attr('strokeWidth', strokeWidth);
    curve.addTo(stage);
};

stage.on('message:updateEquation', coefficients => {
    plotCurve(coefficients);
});

plotCurve({ a: 1, b: 4, c: -2 });