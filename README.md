![shieldsIO](https://img.shields.io/github/issues/beatrizsmerino/gulp-compiler)
![shieldsIO](https://img.shields.io/github/forks/beatrizsmerino/gulp-compiler)
![shieldsIO](https://img.shields.io/github/stars/beatrizsmerino/gulp-compiler)




# Gulp compiler


## Gulp Compiler is a basic code for automate the tasks of your development environment, compile SASS and JS with the task runner Gulp.

![Image of Gulp Compiler](https://github.com/beatrizsmerino/gulp-compiler/blob/feature/documentation/documentation/images/gulp-logo.png)


## Development interface
Is developed with [gulp](https://gulpjs.com/) 4.0.0 a task runner and javascript.

### Content
The *'sass'* and *'js'* compilation tasks pick up the files in the *'src'* folder and generate a new *'dist'* folder with the results.  

#### Structure:
```
gulp-compiler (your-name-proyect)
    assets/
        src/
            sass/  
                styles.sass
            js/
                scripts.js
```

#### Output:
```
gulp-compiler (your-name-proyect)
    assets/
        src/
            sass/  
                styles.sass
            js/
                scripts.js
        dist/
            css/
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
`gulp sassCompile`  
`gulp jsCompile`


## Another version
There is a more complete version in the branch `feature/gulpfile-front-back`. [Go there](https://github.com/beatrizsmerino/gulp-compiler/tree/feature/gulpfile-front-back)

- This version separate the frontend and backend.
- It has more tasks as minify images and icons.  
- Use gulp series(): Combines task functions and / or composed operations into larger operations that will be executed one after another, in sequential order.  


## Continue...
Here I leave a link [to continue](https://gulpjs.com/docs/en/getting-started/quick-start) you can add more task if you need. 