import Matrix4x4 from './matrix';

// test('correct coordinates', () => {
//     const A = new Matrix3x3([
//         [1, 2, 3],
//         [4, 5, 6],
//         [7, 8, 9],
//     ]);
//     expect(A.matrix[0][1]).toEqual(2);
// });

test('multiplies correctly', () => {
    const A = new Matrix4x4([
        [1, 2, 3, 0],
        [2, 3, 1, 0],
        [3, 1, 2, 0],
        [0, 0, 0, 0],
    ]);
    const B = new Matrix4x4([
        [-1, 2, -3, 0],
        [2, -3, 1, 0],
        [-3, 1, 2, 0],
        [0, 0, 0, 0],
    ]);
    const expectedResult = new Matrix4x4([
        [-6, -1, 5, 0],
        [1, -4, -1, 0],
        [-7, 5, -4, 0],
        [0, 0, 0, 0],
    ]);
    expect(A.multiply(B)).toEqual(expectedResult);
});

test('multiplies correctly with vectors', () => {
    const A = new Matrix4x4([
        [1, 9, 0, 9],
        [9, 0, 0, 7],
        [4, 4, 3, 3],
        [5, 5, 3, 7],
    ]);
    const v = {
        x: 2,
        y: 5,
        z: 5,
        w: 8,
    };
    const u = A.multiplyVector(v);
    expect(u).toEqual({
        x: 119,
        y: 74,
        z: 67,
        w: 106,
    });
});
