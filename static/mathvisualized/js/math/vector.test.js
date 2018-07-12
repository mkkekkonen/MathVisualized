'use strict';

var _vector = require('./vector');

var _vector2 = _interopRequireDefault(_vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it('calculates distance correctly', function () {
    var v = new _vector2.default({ x: 1, y: 1, z: 0 });
    var u = new _vector2.default({ x: 3, y: 1, z: 0 });
    expect(v.distanceFrom(u)).toBe(2);
});

it('calculates distance correctly 2', function () {
    var v = new _vector2.default({ x: 1, y: 3, z: 0 });
    var u = new _vector2.default({ x: 1, y: 1, z: 0 });
    expect(v.distanceFrom(u)).toBe(2);
});