(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _quadraticequation = require("../constants/quadraticequation");

var _vector = _interopRequireDefault(require("../math/vector"));

var _viewport = _interopRequireDefault(require("../math/viewport"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var strokeColor = '#000';
var strokeWidth = 2;
var dummyEquation = 'y = x^2 + 4x - 2';
stage.setBackgroundColor('#ccc');
var viewportMatrix = (0, _viewport.default)({
  worldWidth: _quadraticequation.worldWidth,
  worldHeight: _quadraticequation.worldHeight,
  screenWidth: _quadraticequation.movieWidth,
  screenHeight: _quadraticequation.movieHeight
});
var xStart = new _vector.default({
  x: -5,
  y: 0,
  z: 0
});
xStart = viewportMatrix.multiplyVector(xStart);
var xEnd = new _vector.default({
  x: 5,
  y: 0,
  z: 0
});
xEnd = viewportMatrix.multiplyVector(xEnd);
var xAxis = new Path();
xAxis.moveTo(xStart.x, xStart.y).lineTo(xEnd.x, xEnd.y);
xAxis.attr('strokeColor', strokeColor);
xAxis.attr('strokeWidth', strokeWidth);
xAxis.addTo(stage);
var yStart = new _vector.default({
  x: 0,
  y: -5,
  z: 0
});
yStart = viewportMatrix.multiplyVector(yStart);
var yEnd = new _vector.default({
  x: 0,
  y: 5,
  z: 0
});
yEnd = viewportMatrix.multiplyVector(yEnd);
var yAxis = new Path();
yAxis.moveTo(yStart.x, yStart.y).lineTo(yEnd.x, yEnd.y);
yAxis.attr('strokeColor', strokeColor);
yAxis.attr('strokeWidth', strokeWidth);
yAxis.addTo(stage);
var curve = null;

var plotCurve = function plotCurve(_ref) {
  var a = _ref.a,
      b = _ref.b,
      c = _ref.c;

  if (curve) {
    curve.remove();
    curve = null;
  }

  curve = new Path();

  for (var x = -5; x <= 5; x += 0.1) {
    var y = a * x * x + b * x + c;
    var coords = new _vector.default({
      x: x,
      y: y,
      z: 0
    });
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

stage.on('message:updateEquation', function (coefficients) {
  plotCurve(coefficients);
});
plotCurve({
  a: 1,
  b: 4,
  c: -2
});

},{"../constants/quadraticequation":2,"../math/vector":5,"../math/viewport":6}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.movieHeight = exports.movieWidth = exports.worldHeight = exports.worldWidth = void 0;
var worldWidth = 10;
exports.worldWidth = worldWidth;
var worldHeight = 10;
exports.worldHeight = worldHeight;
var movieWidth = 480;
exports.movieWidth = movieWidth;
var movieHeight = 480;
exports.movieHeight = movieHeight;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vector = _interopRequireDefault(require("./vector"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Matrix4x4 =
/*#__PURE__*/
function () {
  function Matrix4x4(matrix) {
    _classCallCheck(this, Matrix4x4);

    if (!matrix) {
      this.matrix = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    } else {
      this.matrix = matrix;
    }
  } // See https://en.wikipedia.org/wiki/Matrix_multiplication


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
      return new _vector.default({
        x: x,
        y: y,
        z: z
      });
    }
  }, {
    key: "ij",
    value: function ij(i, j) {
      if (!this.matrix[i]) console.log("The i causing trouble: ".concat(i));
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

var _default = Matrix4x4;
exports.default = _default;

},{"./vector":5}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.round = void 0;

var round = function round(number) {
  return Math.round(number * 100) / 100;
};

exports.round = round;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _util = require("./util");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Vector3 =
/*#__PURE__*/
function () {
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
    key: "distanceFrom",
    value: function distanceFrom(vector) {
      return Math.sqrt(Math.pow(vector.x - this.x, 2) + Math.pow(vector.y - this.y, 2));
    }
  }, {
    key: "toString",
    value: function toString() {
      return "Vector3 ~ (".concat((0, _util.round)(this.x), ", ").concat((0, _util.round)(this.y), ", ").concat((0, _util.round)(this.z), ")");
    }
  }]);

  return Vector3;
}();

var _default = Vector3;
exports.default = _default;

},{"./util":4}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.createReverseViewportMatrix = void 0;

var _matrix = _interopRequireDefault(require("./matrix"));

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

  var scalingMatrix = _matrix.default.scale({
    x: scaleX,
    y: -scaleY,
    z: 1
  });

  var translationMatrix = _matrix.default.translate({
    x: translateX,
    y: translateY,
    z: 0
  });

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

  var translationMatrix = _matrix.default.translate({
    x: -translateX,
    y: -translateY,
    z: 0
  });

  var scalingMatrix = _matrix.default.scale({
    x: scaleX,
    y: -scaleY,
    z: 1
  });

  var worldMatrix = translationMatrix.multiply(scalingMatrix);
  return worldMatrix;
};

exports.createReverseViewportMatrix = createReverseViewportMatrix;
var _default = createViewportMatrix;
exports.default = _default;

},{"./matrix":3}]},{},[1]);
