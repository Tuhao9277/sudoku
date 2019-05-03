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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Grid = __webpack_require__(1);
const grid = new Grid($("#container"));
grid.build();
grid.layout();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

// 生成九宫格
const Tookit = __webpack_require__(2);
class Grid {
    constructor(container) {
        this._$container = container;
    }
    build() {
        const martix = Tookit.martix.makeMatrix();
        const rowGroupClass = ["row_g_top", "row_g_middle", "row_g_bottom"];
        const colGroupClass = ["col_g_left", "col_g_center", "col_g_right"];
        const $cells = martix.map(rowValues => rowValues.map((cellValue, colIndex) => {
            return $("<span>").addClass(colGroupClass[colIndex % 3]).text(cellValue);
        }));
        const $divArray = $cells.map(($spanArray, rowIndex) => {
            return $("<div>").addClass("row").addClass(rowGroupClass[rowIndex % 3]).append($spanArray);
        });
        this._$container.append($divArray);
    }
    layout() {
        const width = $("span:first", this._$container).width();
        $("span", this._$container).height(width).css({
            "line-height": `${width}px`,
            "font-size": width < 32 ? `${width / 2}px` : ''
        });
    }
}
module.exports = Grid;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

/**
 *  矩阵和数组相关的工具
 */
const matrixTookit = {
    makeRow(v = 0) {
        const array = new Array(9);
        array.fill(v);
        return array;
    },
    makeMatrix(v = 0) {
        return Array.from({ length: 9 }, () => this.makeRow(v));
        // return Array.from({ length: 9 })
        //     .map(() => 
        //         makeRow(v)
        //     )
        // const array = new Array(9);
        // array.fill(makeRow(v));
        // return array;
    },
    shuffle(array) {
        // 最后一个元素不需要进行交换
        for (let i = 0; i <= array.length - 2; i++) {
            const j = i + Math.floor(Math.random() * (array.length - i));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    },
    /**
     * TODO 检查指定位置是否可以填入数
     */
    checkFillable(martix, n, rowIndex, colIndex) {
        const row = martix[rowIndex];
        const column = this.makeRow().map((v, i) => martix[i][colIndex]);
        const { boxIndex } = boxTookit.convertToBoxIndex(rowIndex, colIndex);
        // boxIndex所在的宫的所有元素 根据已知，获取宫的第一个元素是关键。
        const box = boxTookit.getBoxCells(boxIndex);
        for (let i = 0; i < 9; i++) {
            if (row[i] == n || column[i] == n || box[i] == n) {
                return false;
            }
        }
        return true;
    }
};
/**
 * 宫坐标系
 */
const boxTookit = {
    // TODO 
    convertToBoxIndex(rowIndex, colIndex) {
        return {
            boxIndex: Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3),
            cellIndex: rowIndex % 3 * 3 + colIndex % 3
        };
    },
    convertFromBoxIndex(boxIndex, cellIndex) {
        return {
            rowIndex: Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3),
            colIndex: boxIndex % 3 * 3 + cellIndex % 3
        };
    },
    getBoxCells(boxIndex) {
        const startRowIndex = Math.floor(boxIndex / 3) * 3;
        const startColIndex = boxIndex % 3 * 3;
        const result = [];
        for (let cellIndex = 0; cellIndex < 9; cellIndex++) {
            const rowIndex = startRowIndex + Math.floor(cellIndex / 3);
            const colIndex = startColIndex + cellIndex % 3;
            result.push(martix[rowIndex][colIndex]);
        }
        return result;
    }

};
/**
 * 工具集
 */
module.exports = class Tookit {
    /**
     * 矩阵和数据相关的工具
     */
    static get martix() {
        return matrixTookit;
    }
    /**
     * 宫坐标系相关工具
     */
    static get box() {
        return boxTookit;
    }
};

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map