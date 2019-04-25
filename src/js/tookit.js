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
    }
}
module.exports = matrixTookit;