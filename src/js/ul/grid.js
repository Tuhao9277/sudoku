// 生成九宫格
const Tookit = require("../core/tookit")
class Grid {
    constructor(container) {
        this._$container = container;

    }
    build() {
        const martix = Tookit.martix.makeMatrix();
        const rowGroupClass = ["row_g_top", "row_g_middle", "row_g_bottom"];
        const colGroupClass = ["col_g_left", "col_g_center", "col_g_right"];
        const $cells = martix.map(rowValues => rowValues
            .map((cellValue, colIndex) => {
                return $("<span>")
                    .addClass(colGroupClass[colIndex % 3])
                    .text(cellValue)
            }));
        const $divArray = $cells.map(($spanArray, rowIndex) => {
            return $("<div>")
                .addClass("row")
                .addClass(rowGroupClass[rowIndex % 3])
                .append($spanArray);
        });
        this._$container.append($divArray);

    }
    layout() {
        const width = $("span:first", this._$container).width();
        $("span", this._$container)
            .height(width)
            .css({
                "line-height": `${width}px`,
                "font-size": width < 32 ? `${width / 2}px` : ''
            })
    }
}
module.exports = Grid;