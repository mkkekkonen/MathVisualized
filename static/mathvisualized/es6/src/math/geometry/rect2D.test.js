import Rect2D from './rect2D';
import Vector3 from '../vector';

describe('collidesWithAABB', () => {
    /**
     * ####
     * ####
     * ####
     * ####
     * 
     *  $$$$
     *  $$$$
     *  $$$$
     *  $$$$
     */
    it('does not collide 1', () => {
        const rect1 = new Rect2D({
            center: new Vector3({ x: 2, y: 7 }),
            width: 4,
            height: 4,
        });

        const rect2 = new Rect2D({
            center: new Vector3({ x: 3, y: 2}),
            width: 4,
            height: 4,
        });

        expect(rect1.collidesWithAABB(rect2))
            .toBe(false);
    });

    /**
     * ####
     * #### $$$$
     * #### $$$$
     * #### $$$$
     *      $$$$
     */
    it('does not collide 2', () => {
        const rect1 = new Rect2D({
            center: new Vector3({ x: 2, y: 3 }),
            width: 4,
            height: 4,
        });

        const rect2 = new Rect2D({
            center: new Vector3({ x: 7, y: 2 }),
            width: 4,
            height: 4,
        });

        expect(rect1.collidesWithAABB(rect2))
            .toBe(false);
    });

    /**
     * ####
     * #$$$$
     * #$$$$
     * #$$$$
     *  $$$$
     */
    it('collides', () => {
        const rect1 = new Rect2D({
            center: new Vector3({ x: 2, y: 3 }),
            width: 4,
            height: 4,
        });

        const rect2 = new Rect2D({
            center: new Vector3({ x: 3, y: 2 }),
            width: 4,
            height: 4,
        });

        expect(rect1.collidesWithAABB(rect2))
            .toBe(true);
    });
});
