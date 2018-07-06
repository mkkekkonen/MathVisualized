'use strict';

var _viewport = require('./viewport');

var _viewport2 = _interopRequireDefault(_viewport);

var _matrix = require('./matrix');

var _matrix2 = _interopRequireDefault(_matrix);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('creates correct viewport matrix', function () {
    var A = (0, _viewport2.default)({
        worldWidth: 10,
        worldHeight: 10,
        screenWidth: 640,
        screenHeight: 480
    });
    expect(A).toEqual(new _matrix2.default([[64, 0, 0, 0], [0, -48, 0, 0], [0, 0, 0, 0], [320, 240, 0, 1]]));
});