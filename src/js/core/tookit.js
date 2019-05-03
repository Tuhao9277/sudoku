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
    checkFillable(matrix, n, rowIndex, colIndex) {
        const row = matrix[rowIndex];
        const column = this.makeRow().map((v, i) => matrix[i][colIndex]);
        const { boxIndex } = boxTookit.convertToBoxIndex(rowIndex, colIndex);
        // boxIndex所在的宫的所有元素 根据已知，获取宫的第一个元素是关键。
        const box = boxTookit.getBoxCells(matrix,boxIndex);
        for (let i = 0; i < 9; i++) {
            if(row[i] == n || column[i] == n || box[i] == n){
                return false;
            }
        }
        return true;
    }
}
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
    getBoxCells(matrix,boxIndex) {
        const startRowIndex = Math.floor(boxIndex / 3) * 3;
        const startColIndex = boxIndex % 3 * 3;
        const result = [];
        for (let cellIndex = 0; cellIndex < 9; cellIndex++) {
            const rowIndex = startRowIndex + Math.floor(cellIndex /3 );
            const colIndex = startColIndex + cellIndex%3;
            result.push(matrix[rowIndex][colIndex]);
            
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
    static get matrix() {
        return matrixTookit;
    }
    /**
     * 宫坐标系相关工具
     */
    static get box() {
        return boxTookit;
    }
}