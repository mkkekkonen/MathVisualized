import Konva from 'konva';

import * as util from '../../../util/util';
import * as lineRenderer from '../../../renderers/lineRenderer';
import * as constants from '../../../constants/global';
import Line2D, { lineTypes } from '../../../math/geometry/line2D';
import Vector3 from '../../../math/vector';
import Block2D from '../../../objects/block2D';

const { stage, layer } = util.getDefaultKonvaStage2();

const horizon = new Line2D({
    type: lineTypes.SLOPE_INTERCEPT,
    slope: 0,
    yIntercept: -2.5,
});

const block = new Block2D({
    location: new Vector3(),
    width: 2,
    height: 1,
});

block.initializeShape(layer, util.defaultViewportMatrix);

const update = timeDeltaSeconds => {
    block.update(timeDeltaSeconds, new Vector3({ x: 0.1, y: 0, z: 0 }));
};

const render = () => {
    layer.removeChildren();

    lineRenderer.plotSlopeInterceptLine({
        line: horizon,
        layer,
        worldWidth: constants.worldWidth,
        strokeColor: '#000',
    });

    block.render(layer, util.defaultViewportMatrix);

    layer.draw();
};

let previousTime = new Date().getTime();

window.setInterval(() => {
    const currentTime = new Date().getTime();
    const timeDelta = currentTime - previousTime;
    const timeDeltaSeconds = timeDelta / 1000;
    update(timeDeltaSeconds);
    render();
    previousTime = currentTime;
}, 1000.0 / 60.0);
