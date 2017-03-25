(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["redux-recovery"] = factory();
	else
		root["redux-recovery"] = factory();
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
	exports.persistAction = exports.start = exports.persistWithConditions = exports.persistor = undefined;

	var _Storage = __webpack_require__(2);

	var _Storage2 = _interopRequireDefault(_Storage);

	var _constantes = __webpack_require__(1);

	var CONSTANTES = _interopRequireWildcard(_constantes);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var persistor = exports.persistor = function persistor() {
	  var recordAction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	  var key = arguments[1];

	  undefined.persistActionType = CONSTANTES.PERSIST_STORE;
	  undefined.recordAction = recordAction;
	  _Storage2.default.initLocalStorage(key);
	};

	var persistWithConditions = exports.persistWithConditions = function persistWithConditions(currentState, action) {
	  if (!currentState) return;

	  if (action.type === undefined.persistActionType) {
	    undefined.setStorage(currentState);
	  }
	};

	var start = exports.start = function start(store) {
	  return function (next) {
	    return function (action) {
	      var result = next(action);
	      var currentState = store.getState();
	      persistWithConditions(currentState, action);
	      if (undefined.recordAction) {
	        undefined.persistAction(action);
	      }
	      return result;
	    };
	  };
	};

	var persistAction = exports.persistAction = function persistAction(action) {
	  if (!action) return;
	  var actionArray = undefined.getStorage('REDUX_RECOVER_ACTION') || [];

	  if (actionArray.length === undefined.nbSavedActions) {
	    actionArray.shift(action);
	  } else {
	    actionArray.push(action);
	  }
	  _Storage2.default.setStorage('REDUX_RECOVER_ACTION', actionArray.reverse());
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var PERSIST_STORE = exports.PERSIST_STORE = 'PERSIST_STORE';
	var PURGE_STORE = exports.PURGE_STORE = 'PURGE_STORE';
	var ERROR_PERSING_STORE = exports.ERROR_PERSING_STORE = 'ERROR_PERSING_STORE';

/***/ },
/* 2 */
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

	exports.default = new Storage();

/***/ }
/******/ ])
});
;