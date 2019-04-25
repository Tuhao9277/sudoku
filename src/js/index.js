const tookit = require("./tookit")
const matrix = tookit.makeMatrix();

class Grid{
    constructor(container){
        this._$container = container;

    }
    build(){
        const martix = tookit.makeMatrix();
        const $cells = martix.map(rowValues =>  rowValues.map(cellValue =>{
            return  $("<span>").text(cellValue)
         }));
        const $divArray = $cells.map($spanArray=>{
             return $("<div>").append($spanArray);
         });
         this._$container.append($divArray);
       
    }
}
new Grid($("#container")).build();