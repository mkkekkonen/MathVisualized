'use strict';

var _curveequation = require('../constants/curveequation');

var _vector = require('../math/vector');

var _vector2 = _interopRequireDefault(_vector);

var _viewport = require('../math/viewport');

var _viewport2 = _interopRequireDefault(_viewport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var strokeColor = '#000';
var strokeWidth = 2;

var dummyEquation = 'y = x^2 + 4x - 2';

stage.setBackgroundColor('#ccc');

var viewportMatrix = (0, _viewport2.default)({
    worldWidth: _curveequation.worldWidth,
    worldHeight: _curveequation.worldHeight,
    screenWidth: _curveequation.movieWidth,
    screenHeight: _curveequation.movieHeight
});

var xStart = new _vector2.default({ x: -5, y: 0, z: 0 });
xStart = viewportMatrix.multiplyVector(xStart);

var xEnd = new _vector2.default({ x: 5, y: 0, z: 0 });
xEnd = viewportMatrix.multiplyVector(xEnd);

var xAxis = new Path();
xAxis.moveTo(xStart.x, xStart.y).lineTo(xEnd.x, xEnd.y);
xAxis.attr('strokeColor', strokeColor);
xAxis.attr('strokeWidth', strokeWidth);
xAxis.addTo(stage);

var yStart = new _vector2.default({ x: 0, y: -5, z: 0 });
yStart = viewportMatrix.multiplyVector(yStart);

var yEnd = new _vector2.default({ x: 0, y: 5, z: 0 });
yEnd = viewportMatrix.multiplyVector(yEnd);

var yAxis = new Path();
yAxis.moveTo(yStart.x, yStart.y).lineTo(yEnd.x, yEnd.y);
yAxis.attr('strokeColor', strokeColor);
yAxis.attr('strokeWidth', strokeWidth);
yAxis.addTo(stage);

var curve = null;

var plotCurve = function plotCurve() {
    if (curve) {
        curve.remove();
        curve = null;
    }

    curve = new Path();

    for (var x = -5; x <= 5; x += 0.1) {
        var y = x * x + 4 * x - 2;

        var coords = new _vector2.default({ x: x, y: y, z: 0 });
        coords = viewportMatrix.multiplyVector(coords);

        if (x === -5) {
            curve.moveTo(coords.x, coords.y);
        } else {
            curve.lineTo(coords.x, coords.y);
        }
    }

    curve.attr('strokeColor', strokeColor);
    curve.attr('strokeWidth', strokeWidth);
    curve.addTo(stage);
};

plotCurve();