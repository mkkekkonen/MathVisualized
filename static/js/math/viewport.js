'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _matrix = require('./matrix');

var _matrix2 = _interopRequireDefault(_matrix);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createViewportMatrix = function createViewportMatrix(_ref) {
    var worldWidth = _ref.worldWidth,
        worldHeight = _ref.worldHeight,
        screenWidth = _ref.screenWidth,
        screenHeight = _ref.screenHeight;

    var scaleX = screenWidth / worldWidth;
    var scaleY = screenHeight / worldHeight;
    var translateX = screenWidth / 2;
    var translateY = screenHeight / 2;

    var scalingMatrix = _matrix2.default.scale({ x: scaleX, y: -scaleY, z: 0 });
    console.log('Scaling matrix');
    console.dir(scalingMatrix);
    var translationMatrix = _matrix2.default.translate({ x: translateX, y: translateY, z: 0 });
    console.log('Translation matrix');
    console.dir(translationMatrix);
    var viewportMatrix = scalingMatrix.multiply(translationMatrix);
    console.log('Viewport matrix');
    console.dir(viewportMatrix);
    return viewportMatrix;
};

exports.default = createViewportMatrix;