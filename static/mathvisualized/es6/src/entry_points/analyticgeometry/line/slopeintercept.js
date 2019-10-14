import * as util from '../../../util/util';
import * as axis2DRenderer from '../../../renderers/axis2DRenderer';
import Line2D from '../../../math/geometry/line2D';
import * as lineUpdater from '../../../updaters/lineUpdater';
import * as lineRenderer from '../../../renderers/lineRenderer';
import { worldWidth } from '../../../constants/global';

const { layer } = util.getDefaultKonvaStage2();
axis2DRenderer.addAxesToLayer(layer);
layer.draw();

const line = Line2D.slopeIntercept({
    slope: 0,
    yIntercept: 0,
});

const updateSlopeInterceptLine = () => {
    const slope = util.parseFloatById('k');
    const yIntercept = util.parseFloatById('b');

    line.updateSlopeIntercept({ slope, yIntercept });
};

document.getElementById('drawButton').addEventListener('click', () => {
    layer.removeChildren();
    axis2DRenderer.addAxesToLayer(layer);
    updateSlopeInterceptLine();
    line.renderSlopeIntercept({ layer });
    layer.draw();
});
