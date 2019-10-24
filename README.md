![shieldsIO](https://img.shields.io/github/issues/beatrizsmerino/gulp-compiler)
![shieldsIO](https://img.shields.io/github/forks/beatrizsmerino/gulp-compiler)
![shieldsIO](https://img.shields.io/github/stars/beatrizsmerino/gulp-compiler)




# Gulp compiler


## Gulp Compiler is a basic code for automate the tasks of your development environment, compile SASS and JS with the task runner Gulp.

![Image of Gulp Compiler](https://github.com/beatrizsmerino/gulp-compiler/blob/feature/documentation/documentation/images/gulp-logo-gulpfile-front-back.png)


## Development interface
Is developed with [gulp](https://gulpjs.com/) 4.0.0 a task runner and javascript.

### Content
The *'sass'* and *'js'* compilation tasks pick up the files in the *'src'* folder and generate a new *'dist'* folder with the results.  

#### Structure:
```
gulp-compiler (your-name-proyect)
    admin/ (backend)
        assets/
            src/
                sass/  
                    abstracts/
                    bases/
                    components/
                    layouts/
                    pages/
                    vendors/
                    themes/
                    styles.sass
                js/  
                    abstracts/
                    bases/
                    components/
                    layouts/
                    pages/
                    vendors/
                    themes/
                    scripts.js
    assets/ (frontend)
        src/
              sass/  
                    abstracts/
                    bases/
                    components/
                    layouts/
                    pages/
                    vendors/
                    themes/
                    styles.sass
              js/  
                    abstracts/
                    bases/
                    components/
                    layouts/
                    pages/
                    vendors/
                    themes/
                    scripts.js
```

#### Output:
```
gulp-compiler (your-name-proyect)
    admin/ (backend)
        assets/
            src/
                sass/  
                    styles.sass
                js/  
                    scripts.js
            dist/ (output)
                sass/  
                    styles.min.css
                js/  
                    scripts.min.js 
    assets/ (frontend)
        src/
            sass/  
                styles.sass
            js/  
                scripts.js
        dist/ (output)
            sass/  
                styles.min.css
            js/  
                scripts.min.js 
```

#### Necessary files
- *package.json*  
Configuration file
- *gulpfile.js*  
Specify possible tasks


## How use
### To use it is necessary have installed:
- [Node](https://nodejs.org/es/)  
[download](https://nodejs.org/es/)  
`node --version`
- [NPM](https://docs.npmjs.com/)  
`npm install`  
`npm --version`
- [Gulp 4.0.0](https://gulpjs.com/)  
`npm install --global gulp-cli`  
`npm install gulp`  
`gulp --version`


### If you already have node, npm and gulp:
After installing everything you need, you must launch the command, for download the packages the 'devDependencies' of configuration file.  
`npm install`


### Tasks availables:
You can start the following tasks using the command console while in the project folder.  
`gulp`  

**FRONT**  
`gulp front`  
`gulp front-css`  
`gulp front-js`  
`gulp front-icon`  
`gulp front-img`  
`gulp front__cssIcomoonMinify`  
`gulp front__cssIcomoonCopy`  
`gulp front__cssIcomoonSocialMinify`  
`gulp front__cssIcomoonSocialCopy`  
`gulp front__sassCompile`  
`gulp front__cssCompile`  
`gulp front__jsCompile`  
`gulp front__imageMinify`  

**BACK**  
`gulp back`  
`gulp back-css`  
`gulp back-js`  
`gulp back-icon`  
`gulp back-img`  
`gulp back__cssIcomoonMinify`  
`gulp back__cssIcomoonCopy`  
`gulp back__cssIcomoonSocialMinify`  
`gulp back__cssIcomoonSocialCopy`  
`gulp back__sassCompile`  
`gulp back__cssCompile`  
`gulp back__jsCompile`  
`gulp back__imageMinify`  


## Continue...
Here I leave a link [to continue](https://gulpjs.com/docs/en/getting-started/quick-start) you can add more task if you need. 