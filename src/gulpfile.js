const gulp = require("gulp");
gulp.task("webpack", () => {
    const webpack = require("webpack-stream");
    const config = require("./webpack.config.js");
    return gulp.src("./js/**/*.js")
        .pipe(webpack(config))
        .pipe(gulp.dest("../www/js"));
    // 转译JavaScript
})
// 编译less
gulp.task("less", () => {
    const less = require("gulp-less");
    return gulp.src("./less/*.less")
        .pipe(less())
        .pipe(gulp.dest("../www/css/"));

})
gulp.task("default", gulp.parallel("webpack", "less"));