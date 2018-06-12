"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vector3 = function Vector3(_ref) {
    var x = _ref.x,
        y = _ref.y,
        z = _ref.z;

    _classCallCheck(this, Vector3);

    this.x = x;
    this.y = y;
    this.z = z;
    this.w = 1;
};

exports.default = Vector3;