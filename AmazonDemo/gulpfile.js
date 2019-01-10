const gulp = require("gulp");


gulp.task("hello",function(){
    console.log("hello");
});
     // 移动首页到dist
 gulp.task("moveIdenx",function(){
     return gulp.src("index.html")
     .pipe(gulp.dest("dist"))
     .pipe(connect.reload());
 })
     // 移动图片
 gulp.task("moveImg",function(){
     return gulp.src(["images/**/*","picture/**/*","carousel/**/*"])
     .pipe(gulp.dest("dist/images"))
     .pipe(connect.reload())
 })

     // 移动照片
//  gulp.task("movePicture",function(){
//      return gulp.src("picture/**/*")
//      .pipe(gulp.dest("dist/images"))
//      .pipe(connect.reload())
// })
    // 移动JSon数据  ；
 gulp.task("data",function(){
    return gulp.src(["*.json","!package.json"])
    .pipe(gulp.dest("dist/data"))
    .pipe(connect.reload())
 })   
 //  移动JS数据
 const uglify = require("gulp-uglify")
 gulp.task("js",function(){
     return gulp.src(["*.js","!gulpfile.js"])
     .pipe(gulp.dest("dist/js"))
     .pipe(connect.reload())
 })
//  gulp.task("js2",function(){
//     return gulp.src("index.js")
//     .pipe(gulp.dest("dist/js"))
//     .pipe(uglify())
//     .pipe(rename("index.min.js"))
//     .pipe(gulp.dest("dist/js"))
//     .pipe(connect.reload())
// })
     // 批量任务
  gulp.task("build",['moveIdenx','moveImg',/* 'movePicture', */'data','js',"scss"])
     // 事件监听
 gulp.task("watch",function(){
     gulp.watch('index.html',["moveIdenx"]);
     gulp.watch(["images/**/*","picture/**/*","carousel/**/*"],['moveImg']);
     gulp.watch("picture/**/*",['movePicture']);
     gulp.watch(["*.json","!package.json"],['data']);
     gulp.watch(["*.js","!gulpfile.js"],['js']);
     gulp.watch('index.scss',['scss']);
     gulp.watch('index.js',['js2']);

 })
//    处理scss文件--
  const scss = require("gulp-scss");
  const minifyCss = require("gulp-minify-css");
  const rename = require("gulp-rename");
   gulp.task("scss",function(){
       return gulp.src('index.scss')
       .pipe(scss())
       .pipe(gulp.dest("dist/css"))
       .pipe(minifyCss())
       .pipe(rename("index.min.css"))
       .pipe(gulp.dest("dist/css"))
       .pipe(connect.reload())
   })

         // 服务器启动自动刷新
   const connect = require('gulp-connect');
   gulp.task('server',function(){
       connect.server({
           root:'dist',
           port:8899,
           livereload:true
       })
   })
   gulp.task("default",["server","watch"]);

