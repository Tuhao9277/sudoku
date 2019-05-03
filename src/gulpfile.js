const gulp = require("gulp");
const gutil = require("gulp-util");
const { PluginError } = gutil;
gulp.task("webpack", async () => {
    const gulpWebpack = require("webpack-stream");
    const webpack = require("webpack");
    const config = require("./webpack.config.js");
    return gulp.src("./js/**/*.js")
        .pipe(gulpWebpack(config,webpack))
        .on("error", function(err) {
            gutil.log(err);
            this.emit("end");
        })
        .pipe(gulp.dest("../www/js"));
    // 转译JavaScript
})
// 编译less
gulp.task("less", () => {
    const less = require("gulp-less");
    return gulp.src("./less/*.less")
        .pipe(less({
            compress:false
        }))
        .on("error",err =>{
            throw new PluginError("less",err);
        })
        .pipe(gulp.dest("../www/css/"));

})
gulp.task("default", gulp.parallel("webpack", "less"));
gulp.task("watch", () => {
    gulp.watch("less/**/*.less", gulp.series("less"));
    gulp.watch("js/**/*.js", gulp.series("webpack"));
})