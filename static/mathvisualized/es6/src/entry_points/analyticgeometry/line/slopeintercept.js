import Konva from 'konva';
import { getDefaultKonvaStage } from '../../../util/util';
import { addAxesToLayer } from '../../../renderers/axis2DRenderer';
import Line2D from '../../../math/geometry/line2D';
import { updateSlopeInterceptLine } from '../../../updaters/lineUpdater';
import { plotSlopeInterceptLine } from '../../../renderers/lineRenderer';
import { worldWidth } from '../../../constants/global';

const stage = getDefaultKonvaStage();
const layer = new Konva.Layer();
stage.add(layer);

addAxesToLayer(layer);
layer.draw();

const line = Line2D.slopeIntercept({
    slope: 0,
    yIntercept: 0,
});

document.getElementById('drawButton').addEventListener('click', () => {
    layer.removeChildren();
    addAxesToLayer(layer);
    updateSlopeInterceptLine(line);
    plotSlopeInterceptLine({ line, layer, worldWidth });
    layer.draw();
});
