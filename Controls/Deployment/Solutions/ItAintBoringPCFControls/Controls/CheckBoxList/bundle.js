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
/******/ 	return __webpack_require__(__webpack_require__.s = "./CheckBoxList/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./CheckBoxList/index.ts":
/*!*******************************!*\
  !*** ./CheckBoxList/index.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/*\r\ncss source for onoff switch: https://proto.io/freebies/onoff/\r\n*/\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n}); // Define const here\n\nvar RowRecordId = \"rowRecId\"; // Style name of Load More Button\n\nvar LoadMoreButton_Hidden_Style = \"LoadMoreButton_Hidden_Style\";\n\nvar CheckBoxList =\n/** @class */\nfunction () {\n  /**\r\n   * Empty constructor.\r\n   */\n  function CheckBoxList() {}\n  /**\r\n   * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.\r\n   * Data-set values are not initialized here, use updateView.\r\n   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.\r\n   * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.\r\n   * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.\r\n   * @param container If control is marked control-type='standard', it receives an empty div element within which it can render its content.\r\n   */\n\n\n  CheckBoxList.prototype.init = function (context, notifyOutputChanged, state, container) {\n    this.contextObj = context; // Need to track container resize so that control could get the available width. The available height won't be provided even this is true\n\n    context.mode.trackContainerResize(true); // Create main table container div. \n\n    this.mainContainer = document.createElement(\"div\");\n    this.mainContainer.classList.add(\"SimpleTable_MainContainer_Style\"); // Create data table container div. \n\n    this.dataTable = document.createElement(\"table\");\n    this.dataTable.classList.add(\"SimpleTable_Table_Style\"); // Create data table container div. \n\n    /*\r\n    this.loadPageButton = document.createElement(\"button\");\r\n    this.loadPageButton.setAttribute(\"type\", \"button\");\r\n    this.loadPageButton.innerText = context.resources.getString(\"PCF_TSTableGrid_LoadMore_ButtonLabel\");\r\n    this.loadPageButton.classList.add(LoadMoreButton_Hidden_Style);\r\n    this.loadPageButton.classList.add(\"LoadMoreButton_Style\");\r\n    */\n    //this.loadPageButton.addEventListener(\"click\", this.onLoadMoreButtonClick.bind(this));\n    // Adding the main table and loadNextPage button created to the container DIV.\n\n    this.mainContainer.appendChild(this.dataTable); //this.mainContainer.appendChild(this.loadPageButton);\n\n    container.appendChild(this.mainContainer);\n  };\n  /**\r\n   * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.\r\n   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions\r\n   */\n\n\n  CheckBoxList.prototype.updateView = function (context) {\n    this.contextObj = context; //this.toggleLoadMoreButtonWhenNeeded(context.parameters.tableGrid);\n\n    if (!context.parameters.tableGrid.loading) {\n      // Get sorted columns on View\n      var columnsOnView = this.getSortedColumnsOnView(context);\n\n      if (!columnsOnView || columnsOnView.length === 0) {\n        return;\n      }\n\n      var columnWidthDistribution = this.getColumnWidthDistribution(context, columnsOnView);\n\n      while (this.dataTable.firstChild) {\n        this.dataTable.removeChild(this.dataTable.firstChild);\n      }\n\n      this.dataTable.appendChild(this.createTableHeader(columnsOnView, columnWidthDistribution));\n      this.dataTable.appendChild(this.createTableBody(columnsOnView, columnWidthDistribution, context.parameters.tableGrid));\n      this.dataTable.parentElement.style.height = window.innerHeight - this.dataTable.offsetTop - 70 + \"px\";\n    }\n  };\n  /**\r\n   * It is called by the framework prior to a control receiving new data.\r\n   * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”\r\n   */\n\n\n  CheckBoxList.prototype.getOutputs = function () {\n    return {};\n  };\n  /**\r\n   * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.\r\n   * i.e. canceling any pending remote calls, removing listeners, etc.\r\n   */\n\n\n  CheckBoxList.prototype.destroy = function () {};\n  /**\r\n   * Get sorted columns on view\r\n   * @param context\r\n   * @return sorted columns object on View\r\n   */\n\n\n  CheckBoxList.prototype.getSortedColumnsOnView = function (context) {\n    if (!context.parameters.tableGrid.columns) {\n      return [];\n    }\n\n    var columns = context.parameters.tableGrid.columns.filter(function (columnItem) {\n      // some column are supplementary and their order is not > 0\n      return columnItem.order >= 0;\n    }); // Sort those columns so that they will be rendered in order\n\n    columns.sort(function (a, b) {\n      return a.order - b.order;\n    });\n    return columns;\n  };\n  /**\r\n   * Get column width distribution\r\n   * @param context context object of this cycle\r\n   * @param columnsOnView columns array on the configured view\r\n   * @returns column width distribution\r\n   */\n\n\n  CheckBoxList.prototype.getColumnWidthDistribution = function (context, columnsOnView) {\n    var widthDistribution = []; // Considering need to remove border & padding length\n\n    var totalWidth = context.mode.allocatedWidth - 250;\n    var widthSum = 0;\n    columnsOnView.forEach(function (columnItem) {\n      widthSum += columnItem.visualSizeFactor;\n    });\n    var remainWidth = totalWidth;\n    columnsOnView.forEach(function (item, index) {\n      var widthPerCell = \"\";\n\n      if (index !== columnsOnView.length - 1) {\n        var cellWidth = Math.round(item.visualSizeFactor / widthSum * totalWidth);\n        remainWidth = remainWidth - cellWidth;\n        widthPerCell = cellWidth + \"px\";\n      } else {\n        widthPerCell = remainWidth + \"px\";\n      }\n\n      widthDistribution.push(widthPerCell);\n    });\n    return widthDistribution;\n  };\n\n  CheckBoxList.prototype.createTableHeader = function (columnsOnView, widthDistribution) {\n    var tableHeader = document.createElement(\"thead\");\n    var tableHeaderRow = document.createElement(\"tr\");\n    tableHeaderRow.classList.add(\"SimpleTable_TableRow_Style\");\n    columnsOnView.forEach(function (columnItem, index) {\n      var tableHeaderCell = document.createElement(\"th\");\n      tableHeaderCell.classList.add(\"SimpleTable_TableHeader_Style\");\n      var innerDiv = document.createElement(\"div\");\n      innerDiv.classList.add(\"SimpleTable_TableCellInnerDiv_Style\");\n      innerDiv.style.maxWidth = widthDistribution[index];\n      innerDiv.innerText = columnItem.displayName;\n      tableHeaderCell.appendChild(innerDiv);\n      tableHeaderRow.appendChild(tableHeaderCell);\n    });\n    tableHeader.appendChild(tableHeaderRow);\n    return tableHeader;\n  };\n\n  CheckBoxList.prototype.createTableBody = function (columnsOnView, widthDistribution, gridParam) {\n    var tableBody = document.createElement(\"tbody\");\n    this.gridEntityName = gridParam.getTargetEntityType();\n\n    if (gridParam.sortedRecordIds.length > 0) {\n      var _loop_1 = function _loop_1(currentRecordId) {\n        var tableRecordRow = document.createElement(\"tr\");\n        tableRecordRow.classList.add(\"SimpleTable_TableRow_Style\");\n        var component = this_1;\n        tableRecordRow.addEventListener(\"dblclick\", this_1.onRowClick.bind(this_1)); // Set the recordId on the row dom\n\n        tableRecordRow.setAttribute(RowRecordId, gridParam.records[currentRecordId].getRecordId());\n        columnsOnView.forEach(function (columnItem, index) {\n          var tableRecordCell = document.createElement(\"td\");\n          tableRecordCell.classList.add(\"SimpleTable_TableCell_Style\");\n\n          if (index == 0) {\n            var innerDiv = document.createElement(\"div\");\n            innerDiv.classList.add(\"SimpleTable_TableCellInnerDiv_Style\");\n            innerDiv.style.maxWidth = widthDistribution[index];\n            innerDiv.innerText = gridParam.records[currentRecordId].getFormattedValue(columnItem.name);\n            tableRecordCell.appendChild(innerDiv);\n          } else {\n            var innerDiv = document.createElement(\"div\");\n            innerDiv.classList.add(\"onoffswitch\");\n            innerDiv.style.maxWidth = widthDistribution[index];\n            var innerCheckbox = document.createElement(\"input\");\n            innerCheckbox.id = \"checkbox\" + currentRecordId;\n            innerCheckbox.setAttribute(\"type\", \"checkbox\");\n            innerCheckbox.setAttribute(\"name\", \"checkbox\" + currentRecordId);\n            innerCheckbox.classList.add(\"onoffswitch-checkbox\");\n            innerCheckbox.checked = gridParam.records[currentRecordId].getValue(columnItem.name) == \"1\";\n            innerDiv.appendChild(innerCheckbox);\n            var innerLabel = document.createElement(\"label\");\n            innerLabel.classList.add(\"onoffswitch-label\");\n            innerLabel.setAttribute(\"for\", innerCheckbox.id);\n            innerLabel.setAttribute(RowRecordId, currentRecordId);\n            innerLabel.setAttribute(\"attributeName\", columnItem.name);\n            innerDiv.appendChild(innerLabel);\n            var innerSpan = document.createElement(\"span\");\n            innerSpan.classList.add(\"onoffswitch-inner\");\n            innerLabel.appendChild(innerSpan);\n            var innerSpan1 = document.createElement(\"span\");\n            innerSpan1.classList.add(\"onoffswitch-switch\");\n            innerLabel.appendChild(innerSpan1);\n            tableRecordCell.appendChild(innerDiv);\n            innerLabel.addEventListener(\"click\", component.onLabelClick.bind(component));\n          }\n          /*\r\n              <div class=\"onoffswitch\">\r\n              <input type=\"checkbox\" name=\"onoffswitch\" class=\"onoffswitch-checkbox\" id=\"myonoffswitch\" checked>\r\n              <label class=\"onoffswitch-label\" for=\"myonoffswitch\">\r\n                  <span class=\"onoffswitch-inner\"></span>\r\n                  <span class=\"onoffswitch-switch\"></span>\r\n              </label>\r\n          </div>\r\n          */\n\n\n          tableRecordRow.appendChild(tableRecordCell);\n        });\n        tableBody.appendChild(tableRecordRow);\n      };\n\n      var this_1 = this;\n\n      for (var _i = 0, _a = gridParam.sortedRecordIds; _i < _a.length; _i++) {\n        var currentRecordId = _a[_i];\n\n        _loop_1(currentRecordId);\n      }\n    } else {\n      var tableRecordRow = document.createElement(\"tr\");\n      var tableRecordCell = document.createElement(\"td\");\n      tableRecordCell.classList.add(\"No_Record_Style\");\n      tableRecordCell.colSpan = columnsOnView.length;\n      tableRecordCell.innerText = this.contextObj.resources.getString(\"PCF_TSTableGrid_No_Record_Found\");\n      tableRecordRow.appendChild(tableRecordCell);\n      tableBody.appendChild(tableRecordRow);\n    }\n\n    return tableBody;\n  };\n  /**\r\n   * Row Click Event handler for the associated row when being clicked\r\n   * @param event\r\n   */\n\n\n  CheckBoxList.prototype.onLabelClick = function (event) {\n    var rowRecordId = event.currentTarget.getAttribute(RowRecordId);\n\n    if (rowRecordId) {\n      var attributeName = event.currentTarget.getAttribute(\"attributeName\");\n\n      if (attributeName) {\n        var data = {};\n        var checkBox = document.getElementById(\"checkbox\" + rowRecordId);\n        data[attributeName] = !checkBox.checked; //in the onclick it's still the old value which is being switched\n\n        this.contextObj.webAPI.updateRecord(this.gridEntityName, rowRecordId, data);\n      }\n    }\n  };\n  /**\r\n   * Row Click Event handler for the associated row when being clicked\r\n   * @param event\r\n   */\n\n\n  CheckBoxList.prototype.onRowClick = function (event) {\n    var rowRecordId = event.currentTarget.getAttribute(RowRecordId);\n\n    if (rowRecordId) {\n      var entityReference = this.contextObj.parameters.tableGrid.records[rowRecordId].getNamedReference();\n      var entityFormOptions = {\n        entityName: entityReference.entityType,\n        entityId: entityReference.id\n      };\n      this.contextObj.navigation.openForm(entityFormOptions);\n    }\n  };\n  /**\r\n   * Toggle 'LoadMore' button when needed\r\n   */\n\n\n  CheckBoxList.prototype.toggleLoadMoreButtonWhenNeeded = function (gridParam) {\n    if (gridParam.paging.hasNextPage && this.loadPageButton.classList.contains(LoadMoreButton_Hidden_Style)) {\n      this.loadPageButton.classList.remove(LoadMoreButton_Hidden_Style);\n    } else if (!gridParam.paging.hasNextPage && !this.loadPageButton.classList.contains(LoadMoreButton_Hidden_Style)) {\n      this.loadPageButton.classList.add(LoadMoreButton_Hidden_Style);\n    }\n  };\n  /**\r\n   * 'LoadMore' Button Event handler when load more button clicks\r\n   * @param event\r\n   */\n\n\n  CheckBoxList.prototype.onLoadMoreButtonClick = function (event) {\n    this.contextObj.parameters.tableGrid.paging.loadNextPage();\n    this.toggleLoadMoreButtonWhenNeeded(this.contextObj.parameters.tableGrid);\n  };\n\n  return CheckBoxList;\n}();\n\nexports.CheckBoxList = CheckBoxList;\n\n//# sourceURL=webpack://pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad/./CheckBoxList/index.ts?");

/***/ })

/******/ });
var ItAintBoring = ItAintBoring || {};
ItAintBoring.PCFControls = ItAintBoring.PCFControls || {};
ItAintBoring.PCFControls.CheckBoxList = pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad.CheckBoxList;
pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad = undefined;