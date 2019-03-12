import * as util from '../../../util/util';
import * as axis2DRenderer from '../../../renderers/axis2DRenderer';
import Line2D from '../../../math/geometry/line2D';
import LineSegment2D from '../../../math/geometry/lineSegment2D';
import Vector3 from '../../../math/vector';
import { round } from '../../../math/util';
import * as pointUpdater from '../../../updaters/pointUpdater';
import * as lineRenderer from '../../../renderers/lineRenderer';
import * as lineSegmentRenderer from '../../../renderers/lineSegmentRenderer';
import * as dotRenderer from '../../../renderers/dotRenderer';
import { worldWidth, darkGrey } from '../../../constants/global';

const { stage, layer } = util.getDefaultKonvaStage2();
axis2DRenderer.addAxesToLayer(layer);

const fixedLineGeneralForm = Line2D.general({ a: 1, b: 2, c: 3 });
const fixedLineYIntercept = fixedLineGeneralForm.convertToYIntercept();
const fixedLineSlope = Line2D.calculatePerpendicularSlope(
    fixedLineGeneralForm.calculateSlope(),
);
const point = new Vector3({ x: 0, y: 0, z: 0 });
const distanceLine = Line2D.pointSlope({ point, slope: fixedLineSlope });

const plotFixedLine = () => {
    lineRenderer.plotGeneralFormLine({
        line: fixedLineGeneralForm,
        layer,
        worldWidth,
    });
};

plotFixedLine();
layer.draw();

const clickTapHandler = () => {
    layer.removeChildren();

    axis2DRenderer.addAxesToLayer(layer);
    plotFixedLine();

    pointUpdater.updatePointOnClick({ point, stage });
    distanceLine.point = point;
    const distanceLineYIntercept = distanceLine.convertToYIntercept();
    const commonPoint = distanceLineYIntercept.intersects(fixedLineYIntercept);

    const distanceLineSegment = new LineSegment2D({
        startPoint: point,
        endPoint: commonPoint,
    });
    lineSegmentRenderer.addLineSegmentToLayer({
        line: distanceLineSegment,
        layer,
        strokeColor: darkGrey,
    });

    dotRenderer.addDotToLayer({ point, layer });
    dotRenderer.addDotToLayer({ point: commonPoint, layer });

    document.getElementById('output').innerHTML = `Distance: ${round(point.distanceFromLine(fixedLineGeneralForm))}`;

    layer.draw();
};

stage.on('click', clickTapHandler);
stage.on('tap', clickTapHandler);
