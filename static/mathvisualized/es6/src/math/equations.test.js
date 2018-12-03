import { quadraticEquation } from './equations';

describe('quadraticEquation', () => {
    it('calculates the quadratic equation correctly', () => {
        const res = quadraticEquation({ a: 2, b: 3, c: -4 });
        expect(res).toEqual([0.8507810593582121, -2.350781059358212]);
    });

    it('returns no result', () => {
        const res = quadraticEquation({ a: 2, b: 2, c: 3 });
        expect(res).toHaveLength(0);
    });

    it('returns one result', () => {
        const res = quadraticEquation({ a: 1, b: -6, c: 9 });
        expect(res).toHaveLength(1);
    });
});
