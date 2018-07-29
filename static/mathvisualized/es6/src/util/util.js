import Konva from 'konva';
import createViewportMatrix, { createReverseViewportMatrix } from '../math/viewport';
import { movieWidth, movieHeight, worldWidth, worldHeight } from '../constants/global';

const defaultViewportMatrix = createViewportMatrix({
    worldWidth,
    worldHeight,
    screenWidth: movieWidth,
    screenHeight: movieHeight,
});

const defaultReverseViewportMatrix = createReverseViewportMatrix({
    worldWidth,
    worldHeight,
    screenWidth: movieWidth,
    screenHeight: movieHeight,
});

const getDefaultKonvaStage = () => new Konva.Stage({
    container: document.getElementById('canvas'),
    width: movieWidth,
    height: movieHeight,
});

const parseFloatById = (id) => {
    const valueString = document.getElementById(id).value;
    return valueString.length > 0 ? parseFloat(valueString) : 0;
};

export {
    defaultViewportMatrix,
    defaultReverseViewportMatrix,
    getDefaultKonvaStage,
    parseFloatById,
};
