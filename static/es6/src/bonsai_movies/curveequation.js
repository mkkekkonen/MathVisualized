import { worldWidth, worldHeight, movieWidth, movieHeight } from '../constants/curveequation';
import Vector3 from '../math/vector'
import createViewportMatrix from '../math/viewport';

stage.setBackgroundColor('#00f');

const viewportMatrix = createViewportMatrix({
    worldWidth,
    worldHeight,
    screenWidth: movieWidth,
    screenHeight: movieHeight,
});

let xStart = new Vector3({ x: -5, y: 0, z: 0 });
xStart = viewportMatrix.multiplyVector(xStart);
// viewportMatrix.ij(0, 3) == 11520 ??!!

let xEnd = new Vector3({ x: 5, y: 0, z: 0 });
xEnd = viewportMatrix.multiplyVector(xEnd);

const xAxis = new Path();
xAxis.moveTo(xStart.x, xStart.y)
    .lineTo(xEnd.x, xEnd.y);
xAxis.attr('strokeColor', '#000');
xAxis.attr('strokeWidth', 2);
xAxis.addTo(stage);

console.dir(xAxis);
