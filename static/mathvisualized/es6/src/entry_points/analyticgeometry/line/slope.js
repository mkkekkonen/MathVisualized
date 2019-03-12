import * as util from '../../../util/util';
import * as axis2DRenderer from '../../../renderers/axis2DRenderer';
import * as lineSegmentRenderer from '../../../renderers/lineSegmentRenderer';
import * as lineSegmentUpdater from '../../../updaters/lineSegmentUpdater';
import LineSegment2D from '../../../math/geometry/lineSegment2D';

const { stage, layer } = util.getDefaultKonvaStage2();
axis2DRenderer.addAxesToLayer(layer);
layer.draw();

const line = new LineSegment2D({ startPoint: null, endPoint: null });

const clickTapHandler = () => {
    layer.removeChildren();
    axis2DRenderer.addAxesToLayer(layer);
    lineSegmentUpdater.updateLine({ line, stage });
    if (line.startPoint && line.endPoint) {
        document.getElementById('output').innerHTML = line.toString({ slope: true });
        lineSegmentRenderer.addLineSegmentToLayer({ line, layer });
        layer.draw();
    }
};

stage.on('click', clickTapHandler);
stage.on('tap', clickTapHandler);
