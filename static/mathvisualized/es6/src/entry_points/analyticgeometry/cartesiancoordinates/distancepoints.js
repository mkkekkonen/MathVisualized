import Konva from 'konva';
import { getDefaultKonvaStage } from '../../../util/util';
import { addAxesToLayer } from '../../../renderers/axis2DRenderer';
import { addLineSegmentToLayer } from '../../../renderers/lineSegmentRenderer';
import { updateLineOnClick } from '../../../updaters/lineSegmentUpdater';
import LineSegment2D from '../../../math/geometry/lineSegment2D';

const stage = getDefaultKonvaStage();
const layer = new Konva.Layer();
stage.add(layer);

addAxesToLayer(layer);
layer.draw();

const line = new LineSegment2D({ startPoint: null, endPoint: null });

const clickTapHandler = () => {
    layer.removeChildren();
    addAxesToLayer(layer);
    updateLineOnClick({ line, stage });
    if (line.startPoint && line.endPoint) {
        document.getElementById('output').innerHTML = line.toString();
        addLineSegmentToLayer({ line, layer });
        layer.draw();
    }
};

stage.on('click', clickTapHandler);
stage.on('tap', clickTapHandler);
