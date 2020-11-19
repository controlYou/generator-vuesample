const Generator = require('yeoman-generator')

module.exports = class extends Generator{
    prompting () {
        return this.prompt([
            {
                type:'input',
                name: 'projectname',
                message:"please input projectname",
                default:this.appname
            }  
        ])
        .then(answers => {
            this.answers = answers
        })
    }
    writing () {
        // 把每一个文件都通过模板转换到目标路径
        const templates = [
            'public/favicon.ico',
            'public/index.html',
            'src/assets/logo.png',
            'src/components/Add.vue',
            'src/components/Back.vue',
            'src/router/index.js',
            'src/store/store.js',
            'src/App.vue',
            'src/main.js',
            'babel.config.js',
            'package-lock.json',
            'package.json',
            'README.md',
            'vue.config.js'
        ]
        templates.forEach(item => {
            this.fs.copyTpl(
                this.templatePath(item),
                this.destinationPath(item),
                this.answers
            )
        })
    }
}