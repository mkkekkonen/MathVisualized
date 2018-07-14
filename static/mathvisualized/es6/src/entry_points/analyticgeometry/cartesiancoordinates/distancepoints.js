import Konva from 'konva';
import { getDefaultKonvaStage } from '../../../util/util';
import { addLineToLayer } from '../../../renderers/lineRenderer';
import { updateLineOnClick } from '../../../updaters/lineUpdater';
import Line2D from '../../../math/geometry/line2D';

const stage = getDefaultKonvaStage();
const layer = new Konva.Layer();
stage.add(layer);

const line = new Line2D({ startPoint: null, endPoint: null });

stage.on('click', () => {
    layer.removeChildren();
    updateLineOnClick({ line, stage });
    if (line.startPoint && line.endPoint) {
        document.getElementById('output').innerHTML = line.toString();
        addLineToLayer({ line, layer });
        layer.draw();
    }
});
