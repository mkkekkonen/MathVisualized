import * as util from '../../../util/util';
import * as axis2DRenderer from '../../../renderers/axis2DRenderer';
import * as inputManager from '../../../input/inputManager';
import LineSegment2D from '../../../math/geometry/lineSegment2D';

const { stage, layer } = util.getDefaultKonvaStage2();
axis2DRenderer.addAxesToLayer(layer);
layer.draw();

const line = new LineSegment2D({ startPoint: null, endPoint: null });

const clickTapHandler = () => {
    layer.removeChildren();
    axis2DRenderer.addAxesToLayer(layer);

    const worldMousePosition = inputManager.getMouseWorldPosition({ stage });
    line.update({ startPoint: line.endPoint, endPoint: worldMousePosition });

    if (line.startPoint && line.endPoint) {
        document.getElementById('output').innerHTML = line.toString();
        line.konvaRender({ layer });
        layer.draw();
    }
};

stage.on('click', clickTapHandler);
stage.on('tap', clickTapHandler);
