import Konva from 'konva';
import { getDefaultKonvaStage } from '../../../util/util';
import { addAxesToLayer } from '../../../renderers/axis2DRenderer';
import { addLineToLayer, addLineMidpointToLayer } from '../../../renderers/lineRenderer';
import { updateLineOnClick } from '../../../updaters/lineUpdater';
import Line2D from '../../../math/geometry/line2D';

const stage = getDefaultKonvaStage();
const layer = new Konva.Layer();
stage.add(layer);

addAxesToLayer(layer);
layer.draw();

const line = new Line2D({ startPoint: null, endPoint: null });

const clickTapHandler = () => {
    layer.removeChildren();
    addAxesToLayer(layer);
    updateLineOnClick({ line, stage });
    if (line.startPoint && line.endPoint) {
        document.getElementById('output').innerHTML = line.toString(true);
        addLineToLayer({ line, layer });
        addLineMidpointToLayer({ line, layer });
        layer.draw();
    }
};

stage.on('click', clickTapHandler);
stage.on('tap', clickTapHandler);
