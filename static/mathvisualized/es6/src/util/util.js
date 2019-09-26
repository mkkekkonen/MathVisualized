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

const circleHasCrossedBorder = ({ side, position, radius, worldWidth, worldHeight }) => {
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

const rectHasCrossedBorder = ({ side, position, rect, worldWidth, worldHeight }) => {
    switch (side) {
        case sides.TOP: {
            if (rect.top > (worldHeight / 2)) {
                return true;
            }
            return false;
        }
        case sides.RIGHT: {
            if (rect.right > (worldWidth / 2)) {
                return true;
            }
            return false;
        }
        case sides.BOTTOM: {
            if (rect.bottom < -(worldHeight / 2)) {
                return true;
            }
            return false;
        }
        case sides.LEFT: {
            if (rect.left < -(worldWidth / 2)) {
                return true;
            }
            return false;
        }
        default:
            return false;
    }
};

export const hasCrossedBorder = ({
    side,
    position,
    radius,
    rect,
    worldWidth,
    worldHeight,
}) => {
    if (radius !== undefined && radius !== null) {
        return circleHasCrossedBorder({ side, position, radius, worldWidth, worldHeight });
    } else if (rect) {
        return rectHasCrossedBorder({ side, position, rect, worldWidth, worldHeight });
    }

    return false;
};

const getOffsets = ({ radius, rect }) => {
    if ((radius !== undefined) && (radius !== null)) {
        const offset = radius / 2;
        return {
            offsetX: offset,
            offsetY: offset,
        };
    } else if (rect) {
        return {
            offsetX: rect.width / 2,
            offsetY: rect.height / 2,
        };
    }

    return {
        offsetX: 0,
        offsetY: 0,
    };
};

export const getBouncedPosition = ({ side, position, radius, rect, worldWidth, worldHeight }) => {
    const newPosition = new Vector3({
        x: position.x,
        y: position.y,
        z: position.z,
    });

    const { offsetX, offsetY } = getOffsets({ radius, rect });

    switch (side) {
    case sides.TOP: {
        const objectTop = newPosition.y + offsetY;
        if (objectTop < (worldHeight / 2)) {
            return newPosition;
        }
        const distanceCrossed = objectTop - (worldHeight / 2);
        newPosition.y -= distanceCrossed * 2;
        newPosition.y = Math.min(worldHeight / 2, newPosition.y);
        return newPosition;
    }
    case sides.RIGHT: {
        const objectRight = newPosition.x + offsetX;
        if (objectRight < (worldWidth / 2)) {
            return newPosition;
        }
        const distanceCrossed = objectRight - (worldWidth / 2);
        newPosition.x -= distanceCrossed * 2;
        newPosition.x = Math.min(worldWidth / 2, newPosition.x);
        return newPosition;
    }
    case sides.BOTTOM: {
        const objectBottom = newPosition.y - offsetY;
        if (objectBottom > -(worldHeight / 2)) {
            return newPosition;
        }
        const distanceCrossed = -(worldHeight / 2) - objectBottom;
        newPosition.y += distanceCrossed * 2;
        return newPosition;
    }
    case sides.LEFT: {
        const objectLeft = newPosition.x - offsetX;
        if (objectLeft > -(worldWidth / 2)) {
            return newPosition;
        }
        const distanceCrossed = -(worldWidth / 2) - objectLeft;
        newPosition.x += distanceCrossed * 2;
        return newPosition;
    }
    default:
        return newPosition;
    }
};

export const getCheckedCollidersKey = (uidA, uidB) => {
    const arr = [uidA, uidB];
    arr.sort();
    const [sortedUidA, sortedUidB] = arr;
    return `${sortedUidA}:${sortedUidB}`;
};
