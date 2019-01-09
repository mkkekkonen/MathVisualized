import Konva from 'konva';
import * as util from '../../../util/util';
import * as axis2DRenderer from '../../../renderers/axis2DRenderer';
import * as lineSegmentRenderer from '../../../renderers/lineSegmentRenderer';
import * as lineSegmentUpdater from '../../../updaters/lineSegmentUpdater';
import LineSegment2D from '../../../math/geometry/lineSegment2D';

const stage = util.getDefaultKonvaStage();
const layer = new Konva.Layer();
stage.add(layer);

axis2DRenderer.addAxesToLayer(layer);
layer.draw();

const line = new LineSegment2D({ startPoint: null, endPoint: null });

const clickTapHandler = () => {
    layer.removeChildren();
    axis2DRenderer.addAxesToLayer(layer);
    lineSegmentUpdater.updateLineOnClick({ line, stage });
    if (line.startPoint && line.endPoint) {
        document.getElementById('output').innerHTML = line.toString(true);
        lineSegmentRenderer.addLineSegmentToLayer({ line, layer });
        lineSegmentRenderer.addLineSegmentMidpointToLayer({ line, layer });
        layer.draw();
    }
};

stage.on('click', clickTapHandler);
stage.on('tap', clickTapHandler);
