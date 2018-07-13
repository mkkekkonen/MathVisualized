import Vector3 from './vector';

it('calculates distance correctly', () => {
    const v = new Vector3({ x: 1, y: 1, z: 0 });
    const u = new Vector3({ x: 3, y: 1, z: 0 });
    expect(v.distanceFrom(u)).toBe(2);
});

it('calculates distance correctly 2', () => {
    const v = new Vector3({ x: 1, y: 3, z: 0 });
    const u = new Vector3({ x: 1, y: 1, z: 0 });
    expect(v.distanceFrom(u)).toBe(2);
});