import * as util from '../../../util/util';
import * as axis2DRenderer from '../../../renderers/axis2DRenderer';
import Line2D, { lineTypes } from '../../../math/geometry/line2D';
import * as lineUpdater from '../../../updaters/lineUpdater';
import * as lineRenderer from '../../../renderers/lineRenderer';
import { worldWidth } from '../../../constants/global';

const { layer } = util.getDefaultKonvaStage2();
axis2DRenderer.addAxesToLayer(layer);
layer.draw();

const line = new Line2D({
    a: 0,
    b: 0,
    c: 0,
    type: lineTypes.GENERAL,
});

const updateGeneralFormLine = () => {
    const a = util.parseFloatById('a');
    const b = util.parseFloatById('b');
    const c = util.parseFloatById('c');

    line.updateGeneralForm({ a, b, c });
};

document.getElementById('drawButton').addEventListener('click', () => {
    layer.removeChildren();
    axis2DRenderer.addAxesToLayer(layer);
    updateGeneralFormLine();
    line.renderGeneralForm({ layer });
    layer.draw();
});
