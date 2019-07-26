import { sides } from '../constants/global';
import Vector3 from '../math/vector';
import { hasCrossedBorder, getBouncedPosition } from './util';

describe('hasCrossedBorder', () => {
    const worldWidth = 10;
    const worldHeight = 10;
    const radius = 1;

    test('top - has crossed', () => {
        expect(
            hasCrossedBorder({
                side: sides.TOP,
                position: new Vector3({ x: 0, y: 5, z: 0 }),
                radius,
                worldWidth,
                worldHeight,
            }),
        ).toBe(true);
    });

    test('top - has not crossed', () => {
        expect(
            hasCrossedBorder({
                side: sides.TOP,
                position: new Vector3({ x: 0, y: 3, z: 0 }),
                radius,
                worldWidth,
                worldHeight,
            }),
        ).toBe(false);
    });

    test('right - has crossed', () => {
        expect(
            hasCrossedBorder({
                side: sides.RIGHT,
                position: new Vector3({ x: 5, y: 0, z: 0 }),
                radius,
                worldWidth,
                worldHeight,
            }),
        ).toBe(true);
    });

    test('right - has not crossed', () => {
        expect(
            hasCrossedBorder({
                side: sides.RIGHT,
                position: new Vector3({ x: 3, y: 0, z: 0 }),
                radius,
                worldWidth,
                worldHeight,
            }),
        ).toBe(false);
    });

    test('bottom - has crossed', () => {
        expect(
            hasCrossedBorder({
                side: sides.BOTTOM,
                position: new Vector3({ x: 0, y: -5, z: 0 }),
                radius,
                worldWidth,
                worldHeight,
            }),
        ).toBe(true);
    });

    test('bottom - has not crossed', () => {
        expect(
            hasCrossedBorder({
                side: sides.BOTTOM,
                position: new Vector3({ x: 0, y: -3, z: 0 }),
                radius,
                worldWidth,
                worldHeight,
            }),
        ).toBe(false);
    });

    test('left - has crossed', () => {
        expect(
            hasCrossedBorder({
                side: sides.LEFT,
                position: new Vector3({ x: -5, y: 0, z: 0 }),
                radius,
                worldWidth,
                worldHeight,
            }),
        ).toBe(true);
    });

    test('right - has not crossed', () => {
        expect(
            hasCrossedBorder({
                side: sides.LEFT,
                position: new Vector3({ x: -3, y: 0, z: 0 }),
                radius,
                worldWidth,
                worldHeight,
            }),
        ).toBe(false);
    });
});

describe('getBouncedPosition', () => {
    const worldWidth = 10;
    const worldHeight = 10;

    it('has crossed - top', () => {
        const initialPosition = new Vector3({ x: 0, y: 6, z: 0 });
        const expectedPosition = new Vector3({ x: 0, y: 4, z: 0 });
        expect(getBouncedPosition({
            side: sides.TOP,
            position: initialPosition,
            worldWidth,
            worldHeight,
        })).toEqual(expectedPosition);
    });

    it('has not crossed - top', () => {
        const initialAndExpectedPosition = new Vector3({ x: 0, y: 3, z: 0 });
        expect(getBouncedPosition({
            side: sides.TOP,
            position: initialAndExpectedPosition,
            worldWidth,
            worldHeight,
        })).toEqual(initialAndExpectedPosition);
    });

    it('has crossed - right', () => {
        const initialPosition = new Vector3({ x: 6, y: 0, z: 0 });
        const expectedPosition = new Vector3({ x: 4, y: 0, z: 0 });
        expect(getBouncedPosition({
            side: sides.RIGHT,
            position: initialPosition,
            worldWidth,
            worldHeight,
        })).toEqual(expectedPosition);
    });

    it('has not crossed - right', () => {
        const initialAndExpectedPosition = new Vector3({ x: 3, y: 0, z: 0 });
        expect(getBouncedPosition({
            side: sides.RIGHT,
            position: initialAndExpectedPosition,
            worldWidth,
            worldHeight,
        })).toEqual(initialAndExpectedPosition);
    });

    it('has crossed - bottom', () => {
        const initialPosition = new Vector3({ x: 0, y: -6, z: 0 });
        const expectedPosition = new Vector3({ x: 0, y: -4, z: 0 });
        expect(getBouncedPosition({
            side: sides.BOTTOM,
            position: initialPosition,
            worldWidth,
            worldHeight,
        })).toEqual(expectedPosition);
    });

    it('has not crossed - bottom', () => {
        const initialAndExpectedPosition = new Vector3({ x: 0, y: -3, z: 0 });
        expect(getBouncedPosition({
            side: sides.BOTTOM,
            position: initialAndExpectedPosition,
            worldWidth,
            worldHeight,
        })).toEqual(initialAndExpectedPosition);
    });

    it('has crossed - left', () => {
        const initialPosition = new Vector3({ x: -6, y: 0, z: 0 });
        const expectedPosition = new Vector3({ x: -4, y: 0, z: 0 });
        expect(getBouncedPosition({
            side: sides.LEFT,
            position: initialPosition,
            worldWidth,
            worldHeight,
        })).toEqual(expectedPosition);
    });

    it('has not crossed - left', () => {
        const initialAndExpectedPosition = new Vector3({ x: -3, y: 0, z: 0 });
        expect(getBouncedPosition({
            side: sides.LEFT,
            position: initialAndExpectedPosition,
            worldWidth,
            worldHeight,
        })).toEqual(initialAndExpectedPosition);
    });
});
