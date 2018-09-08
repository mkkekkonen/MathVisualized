import Konva from 'konva';
import { getDefaultKonvaStage } from '../../../util/util';
import { addAxesToLayer } from '../../../renderers/axis2DRenderer';
import Line2D from '../../../math/geometry/line2D';
import LineSegment2D from '../../../math/geometry/lineSegment2D';
import Vector3 from '../../../math/vector';
import { round } from '../../../math/util';
import { updatePointOnClick } from '../../../updaters/pointUpdater';
import { plotGeneralFormLine } from '../../../renderers/lineRenderer';
import { addLineSegmentToLayer } from '../../../renderers/lineSegmentRenderer';
import { addDotToLayer } from '../../../renderers/dotRenderer';
import { worldWidth, darkGrey } from '../../../constants/global';

const stage = getDefaultKonvaStage();
const layer = new Konva.Layer();
stage.add(layer);

const fixedLineGeneralForm = Line2D.general({ a: 1, b: 2, c: 3 });
const fixedLineYIntercept = fixedLineGeneralForm.convertToYIntercept();
const fixedLineSlope = Line2D.calculatePerpendicularSlope(
    fixedLineGeneralForm.calculateSlope(),
);
const point = new Vector3({ x: 0, y: 0, z: 0 });
const distanceLine = Line2D.pointSlope({ point, slope: fixedLineSlope });

const plotFixedLine = () => {
    plotGeneralFormLine({
        line: fixedLineGeneralForm,
        layer,
        worldWidth,
    });
};

addAxesToLayer(layer);
plotFixedLine();
layer.draw();

const clickTapHandler = () => {
    layer.removeChildren();

    addAxesToLayer(layer);
    plotFixedLine();

    updatePointOnClick({ point, stage });
    distanceLine.point = point;
    const distanceLineYIntercept = distanceLine.convertToYIntercept();
    const commonPoint = distanceLineYIntercept.intersects(fixedLineYIntercept);

    const distanceLineSegment = new LineSegment2D({
        startPoint: point,
        endPoint: commonPoint,
    });
    addLineSegmentToLayer({ line: distanceLineSegment, layer, strokeColor: darkGrey });

    addDotToLayer({ point, layer });
    addDotToLayer({ point: commonPoint, layer });

    document.getElementById('output').innerHTML = `Distance: ${round(point.distanceFromLine(fixedLineGeneralForm))}`;

    layer.draw();
};

stage.on('click', clickTapHandler);
stage.on('tap', clickTapHandler);
