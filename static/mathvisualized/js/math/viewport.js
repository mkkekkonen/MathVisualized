'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createReverseViewportMatrix = undefined;

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

    var scalingMatrix = _matrix2.default.scale({ x: scaleX, y: -scaleY, z: 1 });
    var translationMatrix = _matrix2.default.translate({ x: translateX, y: translateY, z: 0 });
    var viewportMatrix = scalingMatrix.multiply(translationMatrix);
    return viewportMatrix;
};

var createReverseViewportMatrix = function createReverseViewportMatrix(_ref2) {
    var worldWidth = _ref2.worldWidth,
        worldHeight = _ref2.worldHeight,
        screenWidth = _ref2.screenWidth,
        screenHeight = _ref2.screenHeight;

    var scaleX = worldWidth / screenWidth;
    var scaleY = worldHeight / screenHeight;
    var translateX = screenWidth / 2;
    var translateY = screenHeight / 2;

    var translationMatrix = _matrix2.default.translate({ x: -translateX, y: -translateY, z: 0 });
    var scalingMatrix = _matrix2.default.scale({ x: scaleX, y: -scaleY, z: 1 });
    var worldMatrix = translationMatrix.multiply(scalingMatrix);
    return worldMatrix;
};

exports.createReverseViewportMatrix = createReverseViewportMatrix;
exports.default = createViewportMatrix;