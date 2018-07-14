import createViewportMatrix, { createReverseViewportMatrix } from '../math/viewport'
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

const getDefaultKonvaStage = () => {
    return new Konva.Stage({
        container: document.getElementById('canvas'),
        width: movieWidth,
        height: movieHeight,
    });
}

export {
    defaultViewportMatrix,
    defaultReverseViewportMatrix,
    getDefaultKonvaStage,
};
