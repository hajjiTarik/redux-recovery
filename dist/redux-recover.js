(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["redux-recover"] = factory();
	else
		root["redux-recover"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Storage2 = __webpack_require__(1);

	var _Storage3 = _interopRequireDefault(_Storage2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _class = function (_Storage) {
	  _inherits(_class, _Storage);

	  function _class() {
	    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
	      recordAction: true,
	      nbSavedActions: 2
	    };

	    _classCallCheck(this, _class);

	    var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));

	    _this.start = function (store) {
	      return function (next) {
	        return function (action) {
	          var result = next(action);
	          var currentState = store.getState();
	          _this.persistWithConditions(currentState, action);
	          if (_this.recordAction) {
	            _this.persistAction(action);
	          }
	          return result;
	        };
	      };
	    };

	    _this.persistAction = function (action) {
	      if (!action) return;
	      console.log("action", _this.getStorage('REDUX_RECOVER_ACTION'));
	      var actionArray = _this.getStorage('REDUX_RECOVER_ACTION') || [];

	      if (actionArray.length == _this.nbSavedActions) {
	        actionArray.shift();
	        actionArray.push(action);
	      } else {
	        actionArray.push(action);
	      }

	      _this.setStorage('REDUX_RECOVER_ACTION', actionArray.reverse());
	    };

	    _this.persistActionType = 'PERSIST_STORE';
	    _this.recordAction = config.recordAction;
	    _this.nbSavedActions = config.nbSavedActions;
	    return _this;
	  }

	  _createClass(_class, [{
	    key: 'persistWithConditions',
	    value: function persistWithConditions(currentState, action) {
	      var _this2 = this;

	      if (!currentState) return;

	      if (action.type == this.persistActionType) {
	        this.setStorage(currentState);
	      }

	      window.onbeforeunload = function () {
	        _this2.setStorage('REDUX_RECOVER_STORE', currentState);
	      };
	    }
	  }]);

	  return _class;
	}(_Storage3.default);

	exports.default = _class;

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Storage = function Storage() {
	  var _this = this;

	  _classCallCheck(this, Storage);

	  this.initLocalStorage = function () {
	    var store = _this.storeKey + "_STORE";
	    var action = _this.storeKey + "_ACTION";

	    if (_this.storage.getItem(store) || _this.storage.getItem(action)) return;

	    _this.storage.setItem(store, null);
	    _this.storage.setItem(action, null);
	  };

	  this.setStorage = function () {
	    var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.storeKey;
	    var data = arguments[1];

	    console.log("key", key, "data", data);
	    _this.storage.setItem(key, JSON.stringify(data));
	  };

	  this.getStorage = function () {
	    var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.storeKey;

	    var store = _this.storage.getItem(key);
	    return JSON.parse(store);
	  };

	  this.clearStorage = function () {
	    _this.storage.removeItem(_this.storeKey);
	  };

	  if (typeof window === 'undefined') return;

	  this.storage = window.localStorage;
	  this.storeKey = "REDUX_RECOVER";
	  this.initLocalStorage();
	};

	exports.default = Storage;

/***/ }
/******/ ])
});
;