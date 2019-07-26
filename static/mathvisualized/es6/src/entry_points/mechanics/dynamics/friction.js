import Konva from 'konva';

import * as util from '../../../util/util';
import * as lineRenderer from '../../../renderers/lineRenderer';
import * as constants from '../../../constants/global';
import Line2D, { lineTypes } from '../../../math/geometry/line2D';

const { stage, layer } = util.getDefaultKonvaStage2();

const horizon = new Line2D({
    type: lineTypes.SLOPE_INTERCEPT,
    slope: 0,
    yIntercept: -2.5,
});

const render = () => {
    layer.removeChildren();

    lineRenderer.plotSlopeInterceptLine({
        line: horizon,
        layer,
        worldWidth: constants.worldWidth,
        strokeColor: '#000',
    });

    layer.draw();
};

let previousTime = new Date().getTime();

window.setInterval(() => {
    const currentTime = new Date().getTime();
    const timeDelta = currentTime - previousTime;
    const timeDeltaSeconds = timeDelta / 1000;
    render();
    previousTime = currentTime;
}, 1000.0 / 60.0);
