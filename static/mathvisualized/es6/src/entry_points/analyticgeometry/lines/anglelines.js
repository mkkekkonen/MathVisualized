import * as util from '../../../util/util';
import * as axis2DRenderer from '../../../renderers/axis2DRenderer';
import Line2D from '../../../math/geometry/line2D';
import * as lineUpdater from '../../../updaters/lineUpdater';
import * as lineRenderer from '../../../renderers/lineRenderer';
import { worldWidth, darkGrey } from '../../../constants/global';
import { radiansToDegrees, round } from '../../../math/util';

const { layer } = util.getDefaultKonvaStage2();
axis2DRenderer.addAxesToLayer(layer);

const fixedLine = Line2D.slopeIntercept({
    slope: 1.5,
    yIntercept: 1,
});

const line = Line2D.slopeIntercept({
    slope: 0,
    yIntercept: 0,
});

const plotFixedLine = () => {
    lineRenderer.plotSlopeInterceptLine({
        line: fixedLine,
        layer,
        worldWidth,
        strokeColor: darkGrey,
    });
};

plotFixedLine();
layer.draw();

document.getElementById('drawButton').addEventListener('click', () => {
    layer.removeChildren();
    axis2DRenderer.addAxesToLayer(layer);
    lineUpdater.updateSlopeInterceptLine(line);
    plotFixedLine();
    lineRenderer.plotSlopeInterceptLine({ line, layer, worldWidth });

    const angle = round(radiansToDegrees(line.angleBetween(fixedLine)));
    document.getElementById('output').innerHTML = `Angle between lines: ${angle} degrees`;

    layer.draw();
});
