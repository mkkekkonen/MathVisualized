import Konva from 'konva';
import { getDefaultKonvaStage } from '../../../util/util';
import { addAxesToLayer } from '../../../renderers/axis2DRenderer';
import { plotPointSlopeLine } from '../../../renderers/lineRenderer';
import { updatePointSlopeLine } from '../../../updaters/lineUpdater';
import { worldWidth } from '../../../constants/global';
import Line2D from '../../../math/geometry/line2D';

const stage = getDefaultKonvaStage();
const layer = new Konva.Layer();
stage.add(layer);

addAxesToLayer(layer);
layer.draw();

const line = new Line2D({ slope: 0, point: null });

document.getElementById('drawButton').addEventListener('click', () => {
    layer.removeChildren();
    addAxesToLayer(layer);
    updatePointSlopeLine(line);
    plotPointSlopeLine({ line, layer, worldWidth });
    layer.draw();
});
