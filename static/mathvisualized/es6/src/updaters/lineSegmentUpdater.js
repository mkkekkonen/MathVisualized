import * as inputManager from '../input/inputManager';

const updateLine = ({ line, stage }) => {
    line.startPoint = line.endPoint;
    const worldVector = inputManager.getMouseWorldPosition({ stage });
    line.endPoint = worldVector;
};

const updateLineFixedStart = ({ line, stage }) => {
    const worldVector = inputManager.getMouseWorldPosition({ stage });
    line.endPoint = worldVector;
};

export { updateLine, updateLineFixedStart };
