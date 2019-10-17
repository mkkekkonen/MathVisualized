import * as util from '../../../util/util';
import * as axis2DRenderer from '../../../renderers/axis2DRenderer';
import Line2D from '../../../math/geometry/line2D';
import LineSegment2D from '../../../math/geometry/lineSegment2D';
import Point2D from '../../../math/geometry/point2D';
import Vector3 from '../../../math/vector';
import { round } from '../../../math/util';
import * as pointUpdater from '../../../updaters/pointUpdater';
import * as lineSegmentRenderer from '../../../renderers/lineSegmentRenderer';
import * as dotRenderer from '../../../renderers/dotRenderer';
import * as inputManager from '../../../input/inputManager';
import { worldWidth, darkGrey } from '../../../constants/global';

const { stage, layer } = util.getDefaultKonvaStage2();
axis2DRenderer.addAxesToLayer(layer);

const fixedLineGeneralForm = Line2D.general({ a: 1, b: 2, c: 3 });
const fixedLineYIntercept = fixedLineGeneralForm.convertToYIntercept();
const fixedLineSlope = Line2D.calculatePerpendicularSlope(
    fixedLineGeneralForm.calculateSlope(),
);

const point = new Point2D({
    point: new Vector3({ x: 0, y: 0, z: 0 }),
});

const linePoint = new Point2D({
    point: new Vector3({ x: 0, y: 0, z: 0 }),
});

const distanceLine = Line2D.pointSlope({ point, slope: fixedLineSlope });

fixedLineGeneralForm.renderGeneralForm({ layer });
layer.draw();

const clickTapHandler = () => {
    layer.removeChildren();

    axis2DRenderer.addAxesToLayer(layer);
    fixedLineGeneralForm.renderGeneralForm({ layer });

    const mouseWorldPosition = inputManager.getMouseWorldPosition({ stage });
    point.update({ x: mouseWorldPosition.x, y: mouseWorldPosition.y });

    distanceLine.point = point.point;
    const distanceLineYIntercept = distanceLine.convertToYIntercept();
    const commonPoint = distanceLineYIntercept.intersects(fixedLineYIntercept);

    linePoint.update({ x: commonPoint.x, y: commonPoint.y });

    const distanceLineSegment = new LineSegment2D({
        startPoint: point.point,
        endPoint: commonPoint,
    });
    lineSegmentRenderer.addLineSegmentToLayer({
        line: distanceLineSegment,
        layer,
        strokeColor: darkGrey,
    });

    point.render({ layer });
    linePoint.render({ layer });

    document.getElementById('output').innerHTML = `Distance: ${round(point.point.distanceFromLine(fixedLineGeneralForm))}`;

    layer.draw();
};

stage.on('click', clickTapHandler);
stage.on('tap', clickTapHandler);
