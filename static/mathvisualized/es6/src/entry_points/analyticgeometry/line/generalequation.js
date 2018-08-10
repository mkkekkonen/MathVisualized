import Konva from 'konva';
import { getDefaultKonvaStage } from '../../../util/util';
import { addAxesToLayer } from '../../../renderers/axis2DRenderer';
import Line2D, { lineTypes } from '../../../math/geometry/line2D';
import { updateGeneralFormLine } from '../../../updaters/lineUpdater';
import { plotGeneralFormLine } from '../../../renderers/lineRenderer';
import { worldWidth } from '../../../constants/global';

const stage = getDefaultKonvaStage();
const layer = new Konva.Layer();
stage.add(layer);

addAxesToLayer(layer);
layer.draw();

const line = new Line2D({
    a: 0,
    b: 0,
    c: 0,
    type: lineTypes.GENERAL,
});

document.getElementById('drawButton').addEventListener('click', () => {
    layer.removeChildren();
    addAxesToLayer(layer);
    updateGeneralFormLine(line);
    plotGeneralFormLine({ line, layer, worldWidth });
    layer.draw();
});
