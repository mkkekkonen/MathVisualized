import Matrix4x4 from './matrix';

const createViewportMatrix = ({
    worldWidth,
    worldHeight,
    screenWidth,
    screenHeight
}) => {
    const scaleX = screenWidth / worldWidth;
    const scaleY = screenHeight / worldHeight;
    const translateX = screenWidth / 2;
    const translateY = screenHeight / 2;

    const scalingMatrix = Matrix4x4.scale({ x: scaleX, y: -scaleY, z: 1 });
    const translationMatrix = Matrix4x4.translate({ x: translateX, y: translateY, z: 0 });
    const viewportMatrix = scalingMatrix.multiply(translationMatrix);
    return viewportMatrix;
};

const createReverseViewportMatrix = ({
    worldWidth,
    worldHeight,
    screenWidth,
    screenHeight
}) => {
    const scaleX = worldWidth / screenWidth;
    const scaleY = worldHeight / screenHeight;
    const translateX = screenWidth / 2;
    const translateY = screenHeight / 2;

    const translationMatrix = Matrix4x4.translate({ x: -translateX, y: -translateY, z: 0 });
    const scalingMatrix = Matrix4x4.scale({ x: scaleX, y: -scaleY, z: 1 });
    const worldMatrix = translationMatrix.multiply(scalingMatrix);
    return worldMatrix;
};

export { createReverseViewportMatrix };

export default createViewportMatrix;