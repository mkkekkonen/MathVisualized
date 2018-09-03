import Konva from 'konva';
import { getDefaultKonvaStage } from '../../../util/util';
import { addAxesToLayer } from '../../../renderers/axis2DRenderer';
import { addLineSegmentToLayer } from '../../../renderers/lineSegmentRenderer';
import { updateLineOnClick } from '../../../updaters/lineSegmentUpdater';
import LineSegment2D from '../../../math/geometry/lineSegment2D';
import { darkGrey } from '../../../constants/global';
import Vector3 from '../../../math/vector';

const stage = getDefaultKonvaStage();
const layer = new Konva.Layer();
stage.add(layer);

addAxesToLayer(layer);
layer.draw();

const line = new LineSegment2D({ startPoint: null, endPoint: null });

const getCheckedInputId = () => {
    return Array.from(document.getElementsByName('mirroracross'))
        .find(element => element.checked).id;
};

const drawMirroredLine = ({ startPoint, endPoint }) => {
    const checkedInputId = getCheckedInputId();

    const startX = startPoint.x;
    const startY = startPoint.y;
    const endX = endPoint.x;
    const endY = endPoint.y;

    let mirroredStartPoint = null;
    let mirroredEndPoint = null;

    switch (checkedInputId) {
    case 'x':
        mirroredStartPoint = new Vector3({ x: startX, y: -startY, z: 0 });
        mirroredEndPoint = new Vector3({ x: endX, y: -endY, z: 0 });
        break;
    case 'y':
        mirroredStartPoint = new Vector3({ x: -startX, y: startY, z: 0 });
        mirroredEndPoint = new Vector3({ x: -endX, y: endY, z: 0 });
        break;
    case 'o':
    default:
        mirroredStartPoint = new Vector3({ x: -startX, y: -startY, z: 0 });
        mirroredEndPoint = new Vector3({ x: -endX, y: -endY, z: 0 });
    }

    addLineSegmentToLayer({
        line: new LineSegment2D({
            startPoint: mirroredStartPoint,
            endPoint: mirroredEndPoint,
        }),
        layer,
        strokeColor: darkGrey,
    });
};

const drawLines = () => {
    layer.removeChildren();
    addAxesToLayer(layer);
    addLineSegmentToLayer({ line, layer });
    drawMirroredLine(line);
    layer.draw();
};

const clickTapHandler = () => {
    updateLineOnClick({ line, stage });
    if (line.startPoint && line.endPoint) {
        document.getElementById('output').innerHTML = line.toString();
        drawLines();
    }
};

stage.on('click', clickTapHandler);
stage.on('tap', clickTapHandler);

document.getElementById('x').addEventListener('click', drawLines);
document.getElementById('y').addEventListener('click', drawLines);
document.getElementById('o').addEventListener('click', drawLines);
