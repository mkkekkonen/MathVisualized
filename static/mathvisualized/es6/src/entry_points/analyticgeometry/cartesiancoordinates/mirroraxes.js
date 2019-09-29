import * as util from '../../../util/util';
import * as axis2DRenderer from '../../../renderers/axis2DRenderer';
import LineSegment2D from '../../../math/geometry/lineSegment2D';
import { darkGrey } from '../../../constants/global';
import Vector3 from '../../../math/vector';

const { stage, layer } = util.getDefaultKonvaStage2();
axis2DRenderer.addAxesToLayer(layer);
layer.draw();

const line = new LineSegment2D({ startPoint: null, endPoint: null });
const mirroredLine = new LineSegment2D({
    startPoint: null,
    endPoint: null,
    strokeColor: darkGrey,
});

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

    mirroredLine.update({ startPoint: mirroredStartPoint, endPoint: mirroredEndPoint });
    mirroredLine.konvaRender({ layer });
};

const drawLines = () => {
    layer.removeChildren();
    axis2DRenderer.addAxesToLayer(layer);
    line.konvaRender({ layer });
    drawMirroredLine(line);
    layer.draw();
};

const clickTapHandler = () => {
    util.updateLineSegmentOnClick({ lineSegment: line, stage });

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
