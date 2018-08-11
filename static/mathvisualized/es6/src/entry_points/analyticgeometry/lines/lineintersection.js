import Konva from 'konva';
import { getDefaultKonvaStage } from '../../../util/util';
import { addAxesToLayer } from '../../../renderers/axis2DRenderer';
import Line2D from '../../../math/geometry/line2D';
import { updateSlopeInterceptLine } from '../../../updaters/lineUpdater';
import { plotSlopeInterceptLine } from '../../../renderers/lineRenderer';
import { worldWidth, darkGrey } from '../../../constants/global';

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

    const intersection = line.intersects(fixedLine);
    const outputElement = document.getElementById('output');
    if (intersection === true) {
        outputElement.innerHTML = 'Lines are equal';
    } else if (intersection) {
        outputElement.innerHTML = `Intersection point:\n${intersection.toString()}`;
    } else if (!intersection) {
        outputElement.innerHTML = 'Lines are parallel - no intersection';
    }

    layer.draw();
});
