'use strict';

var _curveequation = require('../constants/curveequation');

var _vector = require('../math/vector');

var _vector2 = _interopRequireDefault(_vector);

var _viewport = require('../math/viewport');

var _viewport2 = _interopRequireDefault(_viewport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

stage.setBackgroundColor('#00f');

var viewportMatrix = (0, _viewport2.default)({
    worldWidth: _curveequation.worldWidth,
    worldHeight: _curveequation.worldHeight,
    screenWidth: _curveequation.movieWidth,
    screenHeight: _curveequation.movieHeight
});

var xStart = new _vector2.default({ x: -5, y: 0, z: 0 });
xStart = viewportMatrix.multiplyVector(xStart);
// viewportMatrix.ij(0, 3) == 11520 ??!!

var xEnd = new _vector2.default({ x: 5, y: 0, z: 0 });
xEnd = viewportMatrix.multiplyVector(xEnd);

var xAxis = new Path();
xAxis.moveTo(xStart.x, xStart.y).lineTo(xEnd.x, xEnd.y);
xAxis.attr('strokeColor', '#000');
xAxis.attr('strokeWidth', 2);
xAxis.addTo(stage);

console.dir(xAxis);