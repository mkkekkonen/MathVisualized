import * as util from '../../../util/util';
import * as axis2DRenderer from '../../../renderers/axis2DRenderer';
import * as lineRenderer from '../../../renderers/lineRenderer';
import * as lineUpdater from '../../../updaters/lineUpdater';
import { worldWidth } from '../../../constants/global';
import Line2D, { lineTypes } from '../../../math/geometry/line2D';

const { layer } = util.getDefaultKonvaStage2();
axis2DRenderer.addAxesToLayer(layer);
layer.draw();

const line = new Line2D({
    slope: 0,
    point: null,
    type: lineTypes.POINT_SLOPE,
});

document.getElementById('drawButton').addEventListener('click', () => {
    layer.removeChildren();
    axis2DRenderer.addAxesToLayer(layer);
    lineUpdater.updatePointSlopeLine(line);
    lineRenderer.plotPointSlopeLine({ line, layer, worldWidth });
    layer.draw();
});
