import createViewportMatrix from './viewport';
import Matrix4x4 from './matrix';

test('creates correct viewport matrix', () => {
    const A = createViewportMatrix({
        worldWidth: 10,
        worldHeight: 10,
        screenWidth: 640,
        screenHeight: 480,
    });
    expect(A).toEqual(new Matrix4x4([
        [64, 0, 0, 0],
        [0, -48, 0, 0],
        [0, 0, 1, 0],
        [320, 240, 0, 1],
    ]));
});
