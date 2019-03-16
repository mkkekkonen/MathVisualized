import Konva from 'konva';
import * as util from '../util/util';
import { black, red, strokeWidth } from '../constants/global';
import Vector3 from '../math/vector';

const xAxisStartPoint = new Vector3({ x: -5, y: 0, z: 0 });
const xAxisEndPoint = new Vector3({ x: 5, y: 0, z: 0 });
const yAxisStartPoint = new Vector3({ x: 0, y: -5, z: 0 });
const yAxisEndPoint = new Vector3({ x: 0, y: 5, z: 0 });

const xAxisScreenStartPoint = util.defaultViewportMatrix.multiplyVector(xAxisStartPoint);
const xAxisScreenEndPoint = util.defaultViewportMatrix.multiplyVector(xAxisEndPoint);
const yAxisScreenStartPoint = util.defaultViewportMatrix.multiplyVector(yAxisStartPoint);
const yAxisScreenEndPoint = util.defaultViewportMatrix.multiplyVector(yAxisEndPoint);

const addAxesToLayer = (layer) => {
    const xAxis = new Konva.Line({
        points: [xAxisScreenStartPoint.x, xAxisScreenStartPoint.y,
            xAxisScreenEndPoint.x, xAxisScreenEndPoint.y],
        stroke: black,
        strokeWidth,
    });
    const yAxis = new Konva.Line({
        points: [yAxisScreenStartPoint.x, yAxisScreenStartPoint.y,
            yAxisScreenEndPoint.x, yAxisScreenEndPoint.y],
        stroke: black,
        strokeWidth,
    });
    layer.add(xAxis);
    layer.add(yAxis);
};

export { addAxesToLayer };
