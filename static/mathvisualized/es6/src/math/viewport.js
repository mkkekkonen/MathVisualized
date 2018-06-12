import Matrix4x4 from './matrix';

const createViewportMatrix = ({
    worldWidth,
    worldHeight,
    screenWidth,
    screenHeight,
}) => {
    const scaleX = screenWidth / worldWidth;
    const scaleY = screenHeight / worldHeight;
    const translateX = screenWidth / 2;
    const translateY = screenHeight / 2;

    const scalingMatrix = Matrix4x4.scale({ x: scaleX, y: -scaleY, z: 0 });
    console.log('Scaling matrix');
    console.dir(scalingMatrix);
    const translationMatrix = Matrix4x4.translate({ x: translateX, y: translateY, z: 0 });
    console.log('Translation matrix');
    console.dir(translationMatrix);
    const viewportMatrix = scalingMatrix.multiply(translationMatrix);
    console.log('Viewport matrix');
    console.dir(viewportMatrix);
    return viewportMatrix;
};

export default createViewportMatrix;
