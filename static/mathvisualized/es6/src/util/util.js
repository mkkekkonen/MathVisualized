/* eslint-disable no-shadow */

import Konva from 'konva';
import createViewportMatrix, { createReverseViewportMatrix } from '../math/viewport';
import {
    movieWidth,
    movieHeight,
    worldWidth,
    worldHeight,
    sides,
} from '../constants/global';
import Vector3 from '../math/vector';

export const defaultViewportMatrix = createViewportMatrix({
    worldWidth,
    worldHeight,
    screenWidth: movieWidth,
    screenHeight: movieHeight,
});

export const defaultReverseViewportMatrix = createReverseViewportMatrix({
    worldWidth,
    worldHeight,
    screenWidth: movieWidth,
    screenHeight: movieHeight,
});

export const getDefaultKonvaStage = () => new Konva.Stage({
    container: document.getElementById('canvas'),
    width: movieWidth,
    height: movieHeight,
});

export const getDefaultKonvaStage2 = () => {
    const stage = new Konva.Stage({
        container: document.getElementById('canvas'),
        width: movieWidth,
        height: movieHeight,
    });
    const layer = new Konva.Layer();
    stage.add(layer);

    return { stage, layer };
};

export const parseFloatById = (id) => {
    const valueString = document.getElementById(id).value;
    return valueString.length > 0 ? parseFloat(valueString) : 0;
};

export const hasCrossedBorder = ({
    side,
    position,
    radius,
    worldWidth,
    worldHeight,
}) => {
    switch (side) {
    case sides.TOP: {
        if ((position.y + radius) > (worldHeight / 2)) {
            return true;
        }
        return false;
    }
    case sides.RIGHT: {
        if ((position.x + radius) > (worldWidth / 2)) {
            return true;
        }
        return false;
    }
    case sides.BOTTOM: {
        if ((position.y - radius) < -(worldHeight / 2)) {
            return true;
        }
        return false;
    }
    case sides.LEFT: {
        if ((position.x - radius) < -(worldWidth / 2)) {
            return true;
        }
        return false;
    }
    default:
        return false;
    }
};

export const getBouncedPosition = ({ side, position, worldWidth, worldHeight }) => {
    const newPosition = new Vector3({
        x: position.x,
        y: position.y,
        z: position.z,
    });

    switch (side) {
    case sides.TOP: {
        if (newPosition.y < (worldHeight / 2)) {
            return newPosition;
        }
        const distanceCrossed = newPosition.y - (worldHeight / 2);
        newPosition.y -= distanceCrossed * 2;
        return newPosition;
    }
    case sides.RIGHT: {
        if (newPosition.x < (worldWidth / 2)) {
            return newPosition;
        }
        const distanceCrossed = newPosition.x - (worldWidth / 2);
        newPosition.x -= distanceCrossed * 2;
        return newPosition;
    }
    case sides.BOTTOM: {
        if (newPosition.y > -(worldHeight / 2)) {
            return newPosition;
        }
        const distanceCrossed = -(worldHeight / 2) - newPosition.y;
        newPosition.y += distanceCrossed * 2;
        return newPosition;
    }
    case sides.LEFT: {
        if (newPosition.x > -(worldWidth / 2)) {
            return newPosition;
        }
        const distanceCrossed = -(worldWidth / 2) - newPosition.x;
        newPosition.x += distanceCrossed * 2;
        return newPosition;
    }
    default:
        return newPosition;
    }
};
