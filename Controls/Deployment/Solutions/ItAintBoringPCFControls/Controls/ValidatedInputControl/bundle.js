var pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./ValidatedInputControl/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./ValidatedInputControl/index.ts":
/*!****************************************!*\
  !*** ./ValidatedInputControl/index.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar ValidatedInputControl =\n/** @class */\nfunction () {\n  function ValidatedInputControl() {\n    // RegEx to test against\n    this._regEx = null;\n  }\n\n  ValidatedInputControl.prototype.setErrorState = function (value) {\n    if (this._regEx == null || this._regEx.test(value)) {\n      this.labelElement.innerHTML = \"\";\n      this._isError = false;\n    } else {\n      this.labelElement.innerHTML = \"Incorrect format!\";\n      this._isError = true;\n    }\n\n    return this._isError;\n  };\n\n  ValidatedInputControl.prototype.init = function (context, notifyOutputChanged, state, container) {\n    debugger;\n    this._context = context;\n    this._container = document.createElement(\"div\");\n    this._container;\n    this._notifyOutputChanged = notifyOutputChanged;\n    this._blurHandler = this.blurHandler.bind(this);\n    this._inputHandler = this.inputHandler.bind(this); // creating HTML elements for the input type range and binding it to the function which refreshes the control data\n\n    this.inputElement = document.createElement(\"input\");\n    this.inputElement.setAttribute(\"type\", \"text\");\n    this.inputElement.addEventListener(\"blur\", this._blurHandler);\n    this.inputElement.addEventListener(\"input\", this._inputHandler);\n    this._value = context.parameters.value.raw;\n    if (context.parameters.regEx != null) this._regEx = new RegExp(context.parameters.regEx.raw);\n    var currentValue = context.parameters.value.formatted ? context.parameters.value.formatted : \"0\";\n    this.inputElement.setAttribute(\"value\", currentValue);\n    this.labelElement = document.createElement(\"label\");\n    this.setErrorState(currentValue); // appending the HTML elements to the control's HTML container element.\n\n    this._container.appendChild(this.inputElement);\n\n    this._container.appendChild(this.labelElement);\n\n    container.appendChild(this._container);\n  };\n  /**\r\n  * Updates the values to the internal value variable we are storing and also updates the html label that displays the value\r\n  * @param context : The \"Input Properties\" containing the parameters, control metadata and interface functions\r\n  */\n\n\n  ValidatedInputControl.prototype.blurHandler = function (evt) {\n    var tempValue = this.inputElement.value;\n\n    if (!this.setErrorState(tempValue)) {\n      this._notifyOutputChanged();\n\n      this._value = tempValue;\n    }\n  };\n\n  ValidatedInputControl.prototype.inputHandler = function (evt) {\n    var tempValue = this.inputElement.value;\n\n    if (this._isError && !this.setErrorState(tempValue)) {\n      this._notifyOutputChanged();\n\n      this._value = tempValue;\n    }\n  };\n\n  ValidatedInputControl.prototype.updateView = function (context) {\n    // storing the latest context from the control.\n    this._value = context.parameters.value.raw;\n    this._context = context;\n    this.inputElement.setAttribute(\"value\", context.parameters.value.formatted ? context.parameters.value.formatted : \"\");\n  };\n\n  ValidatedInputControl.prototype.getOutputs = function () {\n    return {\n      value: this._value\n    };\n  };\n\n  ValidatedInputControl.prototype.destroy = function () {\n    this.inputElement.removeEventListener(\"input\", this._inputHandler);\n    this.inputElement.removeEventListener(\"blur\", this._blurHandler);\n  };\n\n  return ValidatedInputControl;\n}();\n\nexports.ValidatedInputControl = ValidatedInputControl;\n\n//# sourceURL=webpack://pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad/./ValidatedInputControl/index.ts?");

/***/ })

/******/ });
var ItAintBoring = ItAintBoring || {};
ItAintBoring.PCFControls = ItAintBoring.PCFControls || {};
ItAintBoring.PCFControls.ValidatedInputControl = pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad.ValidatedInputControl;
pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad = undefined;