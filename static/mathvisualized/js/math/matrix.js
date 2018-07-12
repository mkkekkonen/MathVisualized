"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _vector = require("./vector");

var _vector2 = _interopRequireDefault(_vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Matrix4x4 = function () {
    function Matrix4x4(matrix) {
        _classCallCheck(this, Matrix4x4);

        if (!matrix) {
            this.matrix = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
        } else {
            this.matrix = matrix;
        }
    }

    // See https://en.wikipedia.org/wiki/Matrix_multiplication


    _createClass(Matrix4x4, [{
        key: "multiply",
        value: function multiply(otherMatrix) {
            var newMatrixArray = [];

            for (var i = 0; i < 4; i += 1) {
                newMatrixArray.push([]);
                for (var j = 0; j < 4; j += 1) {
                    var cij = 0;
                    for (var m = 0; m < 4; m += 1) {
                        cij += this.ij(i, m) * otherMatrix.ij(m, j);
                    }
                    newMatrixArray[i].push(cij);
                }
            }

            return new Matrix4x4(newMatrixArray);
        }
    }, {
        key: "multiplyVector",
        value: function multiplyVector(vector) {
            var x = this.ij(0, 0) * vector.x + this.ij(1, 0) * vector.y + this.ij(2, 0) * vector.z + this.ij(3, 0) * vector.w;
            var y = this.ij(0, 1) * vector.x + this.ij(1, 1) * vector.y + this.ij(2, 1) * vector.z + this.ij(3, 1) * vector.w;
            var z = this.ij(0, 2) * vector.x + this.ij(1, 2) * vector.y + this.ij(2, 2) * vector.z + this.ij(3, 2) * vector.w;
            var w = this.ij(0, 3) * vector.x + this.ij(1, 3) * vector.y + this.ij(2, 3) * vector.z + this.ij(3, 3) * vector.w;
            return new _vector2.default({ x: x, y: y, z: z });
        }
    }, {
        key: "ij",
        value: function ij(i, j) {
            if (!this.matrix[i]) console.log("The i causing trouble: " + i);
            return this.matrix[i][j];
        }
    }], [{
        key: "scale",
        value: function scale(_ref) {
            var x = _ref.x,
                y = _ref.y,
                z = _ref.z;

            return new Matrix4x4([[x, 0, 0, 0], [0, y, 0, 0], [0, 0, z, 0], [0, 0, 0, 1]]);
        }
    }, {
        key: "translate",
        value: function translate(_ref2) {
            var x = _ref2.x,
                y = _ref2.y,
                z = _ref2.z;

            return new Matrix4x4([[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [x, y, z, 1]]);
        }
    }]);

    return Matrix4x4;
}();

exports.default = Matrix4x4;