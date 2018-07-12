'use strict';

var _konva = require('konva');

var _konva2 = _interopRequireDefault(_konva);

var _global = require('../constants/global');

var _vector = require('../math/vector');

var _vector2 = _interopRequireDefault(_vector);

var _viewport = require('../math/viewport');

var _viewport2 = _interopRequireDefault(_viewport);

var _util = require('../math/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stage = new _konva2.default.Stage({
    container: document.getElementById('canvas'),
    width: _global.movieWidth,
    height: _global.movieHeight
});

var layer = new _konva2.default.Layer();

stage.add(layer);

var viewportMatrix = (0, _viewport2.default)({
    worldWidth: _global.worldWidth,
    worldHeight: _global.worldHeight,
    screenWidth: _global.movieWidth,
    screenHeight: _global.movieHeight
});

var reverseViewportMatrix = (0, _viewport.createReverseViewportMatrix)({
    worldWidth: _global.worldWidth,
    worldHeight: _global.worldHeight,
    screenWidth: _global.movieWidth,
    screenHeight: _global.movieHeight
});

var previousPoint = null;
var currentPoint = null;

var line = null;

var formatOutput = function formatOutput(distance) {
    return 'Point 1: ' + previousPoint.toString() + '\nPoint 2: ' + currentPoint.toString() + '\nDistance: ' + (0, _util.round)(distance);
};

var calculateAndOutputDistance = function calculateAndOutputDistance() {
    var distance = 0;
    if (previousPoint && currentPoint) {
        distance = previousPoint.distanceFrom(currentPoint);
        document.getElementById('output').innerHTML = formatOutput(distance);
    }
    return distance;
};

var drawLine = function drawLine() {
    if (previousPoint && currentPoint) {
        var screenPreviousPoint = viewportMatrix.multiplyVector(previousPoint);
        var screenCurrentPoint = viewportMatrix.multiplyVector(currentPoint);
        layer.removeChildren();
        line = new _konva2.default.Line({
            points: [screenPreviousPoint.x, screenPreviousPoint.y, screenCurrentPoint.x, screenCurrentPoint.y],
            stroke: _global.black,
            strokeWidth: _global.strokeWidth
        });
        layer.add(line);
        layer.draw();
    }
};

stage.on('click', function () {
    previousPoint = currentPoint;

    var location = stage.getPointerPosition();
    var locationVector = new _vector2.default({
        x: location.x,
        y: location.y,
        z: 0
    });

    var worldVector = reverseViewportMatrix.multiplyVector(locationVector);

    currentPoint = worldVector;

    calculateAndOutputDistance();
    drawLine();
});