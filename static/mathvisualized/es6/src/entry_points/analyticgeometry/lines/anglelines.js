import Konva from 'konva';
import { getDefaultKonvaStage } from '../../../util/util';
import { addAxesToLayer } from '../../../renderers/axis2DRenderer';
import Line2D from '../../../math/geometry/line2D';
import { updateSlopeInterceptLine } from '../../../updaters/lineUpdater';
import { plotSlopeInterceptLine } from '../../../renderers/lineRenderer';
import { worldWidth, darkGrey } from '../../../constants/global';
import { radiansToDegrees, round } from '../../../math/util';

const stage = getDefaultKonvaStage();
const layer = new Konva.Layer();
stage.add(layer);

const fixedLine = Line2D.slopeIntercept({
    slope: 1.5,
    yIntercept: 1,
});

const line = Line2D.slopeIntercept({
    slope: 0,
    yIntercept: 0,
});

const plotFixedLine = () => {
    plotSlopeInterceptLine({
        line: fixedLine,
        layer,
        worldWidth,
        strokeColor: darkGrey,
    });
};

addAxesToLayer(layer);
plotFixedLine();
layer.draw();

document.getElementById('drawButton').addEventListener('click', () => {
    layer.removeChildren();
    addAxesToLayer(layer);
    updateSlopeInterceptLine(line);
    plotFixedLine();
    plotSlopeInterceptLine({ line, layer, worldWidth });

    const angle = round(radiansToDegrees(line.angleBetween(fixedLine)));
    document.getElementById('output').innerHTML = `Angle between lines: ${angle} degrees`;

    layer.draw();
});
