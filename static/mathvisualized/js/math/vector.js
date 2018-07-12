'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = require('./util');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vector3 = function () {
    function Vector3(_ref) {
        var x = _ref.x,
            y = _ref.y,
            z = _ref.z,
            w = _ref.w;

        _classCallCheck(this, Vector3);

        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w || 1;
    }

    _createClass(Vector3, [{
        key: 'distanceFrom',
        value: function distanceFrom(vector) {
            return Math.sqrt(Math.pow(vector.x - this.x, 2) + Math.pow(vector.y - this.y, 2));
        }
    }, {
        key: 'toString',
        value: function toString() {
            return 'Vector3 ~ (' + (0, _util.round)(this.x) + ', ' + (0, _util.round)(this.y) + ', ' + (0, _util.round)(this.z) + ')';
        }
    }]);

    return Vector3;
}();

exports.default = Vector3;