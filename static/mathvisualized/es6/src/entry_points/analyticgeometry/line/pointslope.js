import * as util from '../../../util/util';
import * as axis2DRenderer from '../../../renderers/axis2DRenderer';
import Line2D, { lineTypes } from '../../../math/geometry/line2D';
import Vector3 from '../../../math/vector';

const { layer } = util.getDefaultKonvaStage2();
axis2DRenderer.addAxesToLayer(layer);
layer.draw();

const line = new Line2D({
    slope: 0,
    point: null,
    type: lineTypes.POINT_SLOPE,
});

const updateLine = () => {
    const verticalChecked = document.getElementById('vertical').checked;
    const slope = verticalChecked ? NaN : util.parseFloatById('slope');

    const pointX = util.parseFloatById('x');
    const pointY = util.parseFloatById('y');

    const point = new Vector3({ x: pointX, y: pointY, z: 0 });

    line.updatePointSlope({ point, slope });
}

document.getElementById('drawButton').addEventListener('click', () => {
    layer.removeChildren();
    axis2DRenderer.addAxesToLayer(layer);
    updateLine();
    line.renderPointSlope({ layer });
    layer.draw();
});
