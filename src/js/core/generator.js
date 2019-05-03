const Tookit = require("./tookit")
// 生成数独解决方案
class Generator {
    generate() {
        while (!this.internalGenerate()) {

        }
    }
    internalGenerate() {
        // 入口方法

        this.matrix = Tookit.matrix.makeMatrix();
        this.orders = Tookit.matrix.makeMatrix()
            .map(row => row.map((v, i) => i))
            .map(row => Tookit.matrix.shuffle(row));
        // return Tookit.matrix.makeRow().every((n,i)=>{
        //     this.fillNumber(i+1);
        // })
        for (let n = 1; n <= 9; n++) {
            if (!this.fillNumber(n)) {
                return false;
            };
        }
        return true;
    }
    fillNumber(n) {
        // 填数方法
        return this.fillRow(n, 0);
    }
    fillRow(n, rowIndex) {
        if (rowIndex > 8) {
            return true;
        }
        //  从当前行的列开始
        // 获取行数据
        const row = this.matrix[rowIndex];
        // 随机选择列
        const orders = this.orders[rowIndex];
        for (let i = 0; i < 9; i++) {
            const colIndex = orders[i];
            // 如果当前位置已经填入，跳过
            if (row[colIndex]) {
                continue;
            }
            // 检查这个位置是否能填n
            // TODO Tookit.matrix.checkFillable
            if (!Tookit.matrix.checkFillable(this.matrix, n, rowIndex, colIndex)) {
                continue;
            };
            // 填入
            row[colIndex] = n;
            // 如果当前行填写n成功，递归调用fillRow();
            // 在下一行填写n 若填写失败，则继续寻找当前行的下一个位置
            if (!this.fillRow(n, rowIndex + 1)) {
                row[colIndex] = 0;
                continue;
            }
            return true;
        }
        return false;
    };
}
const generator = new Generator();
generator.generate();
console.log(generator.matrix);