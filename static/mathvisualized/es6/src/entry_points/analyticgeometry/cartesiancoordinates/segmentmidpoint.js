import * as util from '../../../util/util';
import * as axis2DRenderer from '../../../renderers/axis2DRenderer';
import LineSegment2D from '../../../math/geometry/lineSegment2D';

const { stage, layer } = util.getDefaultKonvaStage2();
axis2DRenderer.addAxesToLayer(layer);
layer.draw();

const line = new LineSegment2D({ startPoint: null, endPoint: null });

const clickTapHandler = () => {
    layer.removeChildren();
    axis2DRenderer.addAxesToLayer(layer);

    util.updateLineSegmentOnClick({ lineSegment: line, stage });

    if (line.startPoint && line.endPoint) {
        document.getElementById('output').innerHTML = line.toString(true);
        line.konvaRender({ layer, renderMidpoint: true });
        layer.draw();
    }
};

stage.on('click', clickTapHandler);
stage.on('tap', clickTapHandler);
