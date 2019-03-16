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

it('compares correctly', () => {
    const v = new Vector3({ x: 1, y: 2, z: 3 });
    const u = new Vector3({ x: 1, y: 2, z: 3 });
    expect(v.equals(u)).toBe(true);
});

it('compares correctly 2', () => {
    const v = new Vector3({ x: 1, y: 2, z: 3 });
    const u = new Vector3({ x: 4, y: 5, z: 6 });
    expect(v.equals(u)).toBe(false);
});
