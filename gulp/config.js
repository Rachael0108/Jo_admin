var src = './src';  //带操作
var dest = './dist'; // 操作完成
module.exports = {
    html: {
        src: src + "/*.html",
        dest: dest + "/",
        settings: {
            collapseWhitespace: true,
            removeComments: true
        }
    },
    css: {
        all: src + "/**/*.css",
        src: src + "./css/*.css",
        dest: dest + "/css",
        settings: {}
    }
}
