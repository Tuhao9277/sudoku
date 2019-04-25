module.exports={
    entry :{
        index: "./js/index"
    },
    output :{
        filename:"[name].js"
    },
    devtool:"source-map",
    resolve:{
        extensions:[".js"]
    },
    module:{
        rules:[
            {
                test:/\.js$/ ,
                use:"babel-loader",
            },
           
        ]
    }
}