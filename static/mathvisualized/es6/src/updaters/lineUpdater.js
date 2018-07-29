import { parseFloatById } from '../util/util';
import Vector3 from '../math/vector';

const updatePointSlopeLine = (line) => {
    line.slope = parseFloatById('slope');
    const pointX = parseFloatById('x');
    const pointY = parseFloatById('y');
    line.point = new Vector3({ x: pointX, y: pointY, z: 0 });
};

export { updatePointSlopeLine };
