(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
},{"../constants/curveequation":2,"../math/vector":4,"../math/viewport":5}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var worldWidth = 10;
var worldHeight = 10;
var movieWidth = 480;
var movieHeight = 480;

exports.worldWidth = worldWidth;
exports.worldHeight = worldHeight;
exports.movieWidth = movieWidth;
exports.movieHeight = movieHeight;
},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
            return {
                x: x, y: y, z: z, w: w
            };
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
},{}],4:[function(require,module,exports){
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
},{}],5:[function(require,module,exports){
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
},{"./matrix":3}]},{},[1]);
