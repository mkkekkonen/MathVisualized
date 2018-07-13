import Matrix4x4 from './matrix';
import Vector3 from './vector';

test('correct coordinates', () => {
    const A = new Matrix4x4([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]]);
    expect(A.ij(0, 1)).toEqual(2);
});

test('multiplies correctly', () => {
    const A = new Matrix4x4([[1, 2, 3, 0], [2, 3, 1, 0], [3, 1, 2, 0], [0, 0, 0, 0]]);
    const B = new Matrix4x4([[-1, 2, -3, 0], [2, -3, 1, 0], [-3, 1, 2, 0], [0, 0, 0, 0]]);
    const expectedResult = new Matrix4x4([[-6, -1, 5, 0], [1, -4, -1, 0], [-7, 5, -4, 0], [0, 0, 0, 0]]);
    expect(A.multiply(B)).toEqual(expectedResult);
});

test('multiplies correctly 2', () => {
    const A = new Matrix4x4([[5, 2, 6, 1], [0, 6, 2, 0], [3, 8, 1, 4], [1, 8, 5, 6]]);
    const B = new Matrix4x4([[7, 5, 8, 0], [1, 8, 2, 6], [9, 4, 3, 8], [5, 3, 7, 9]]);
    const expectedResult = new Matrix4x4([[96, 68, 69, 69], [24, 56, 18, 52], [58, 95, 71, 92], [90, 107, 81, 142]]);
    expect(A.multiply(B)).toEqual(expectedResult);
});

test('multiplies correctly with vectors', () => {
    const A = new Matrix4x4([[1, 9, 0, 9], [9, 0, 0, 7], [4, 4, 3, 3], [5, 5, 3, 7]]);
    const v = new Vector3({ x: 2, y: 5, z: 5 });
    const u = A.multiplyVector(v);
    expect(u).toEqual({
        x: 72,
        y: 43,
        z: 18,
        w: 75
    });
});

test('scales vector correctly', () => {
    const v = new Vector3({ x: 1, y: 2, z: 3 });
    const u = Matrix4x4.scale({ x: 2, y: 10, z: 100 }).multiplyVector(v);
    expect(u).toEqual({
        x: 2,
        y: 20,
        z: 300,
        w: 1
    });
});

test('translates vector correctly', () => {
    const v = new Vector3({ x: 1, y: 2, z: 3 });
    const u = Matrix4x4.translate({ x: -3, y: 2, z: 1 }).multiplyVector(v);
    expect(u).toEqual({
        x: -2,
        y: 4,
        z: 4,
        w: 1
    });
});