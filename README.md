![GitHub dependabot](https://img.shields.io/badge/dependabot-enabled-025e8c?logo=Dependabot)
![GitHub last commit](https://img.shields.io/github/last-commit/beatrizsmerino/gulp-compiler)
![GitHub issues](https://img.shields.io/github/issues/beatrizsmerino/gulp-compiler)
![GitHub forks](https://img.shields.io/github/forks/beatrizsmerino/gulp-compiler)
![GitHub stars](https://img.shields.io/github/stars/beatrizsmerino/gulp-compiler)
![GitHub watchers](https://img.shields.io/github/watchers/beatrizsmerino/gulp-compiler)

# Gulp compiler

![Image of Gulp Compiler](README/images/gulp-logo.png)

## 🎯 Description

This repository automates tasks in the development environment using the `Gulp` task runner and the `Javascript` programming language. Contains functions that make it easy to **create a local server**, **copy and paste** folders and files, **compile** and **compress** various types of files. In addition, it is specifically designed to be used in the folders containing the `frontend` and `backend` files of a web site.

By automating these tasks, developers can focus on their creative and productive work without worrying about repetitive manual operations. This makes it a complete and versatile solution to improve efficiency in the development process.

## 🧩 Content

The automated tasks in the `gulpfile.js` include several important functions:

1. Concatenation of `CSS` files of external libraries from `node_modules` folder and compilation of partials `SASS` files, to generate a single minified file.
2. Compilation of external libraries from `node_modules` folder and partials `JS` files into a single minified file.
3. Copying of fonts and minification of css icons, obtained from the online tool `Icomoon`.
4. Copy and compression of `Images`, to improve website performance by reducing its size without compromising its visual quality.

The tasks collect the necessary files from the `src` folder and generate a new `dist` folder containing the processed and optimized results.

The website interface has a `frontend` (visible for all users to interact with) and a `backend` (accessible only to the client that manages the website). Both parts have the same folder and file structure, where the frontend files are located in the root of the project and the backend files inside the `admin` folder located in the root of the project.

### Input structure folders

```shell
node_modules/
    /...
admin/
    src/
        sass/
            /...
            styles.sass
        js/
            /...
            scripts.js
        icomoon/
            icomoon-back/
                fonts/
                    /...
                fonts.css
            icomoon-social/
                fonts/
                    /...
                fonts.css
        images/
            /...
    index.html
src/
    sass/
        /...
        styles.sass
    js/
        /...
        scripts.js
    icomoon/
        icomoon-front/
            fonts/
                /...
            fonts.css
        icomoon-social/
            fonts/
                /...
            fonts.css
    images/
        /...
index.html
```

### Output structure folders

```shell
admin/
    dist/
        css/
            styles.min.css
        js/
            scripts.min.js
        icomoon/
            icomoon-back/
                fonts/
                    /...
                fonts.min.css
            icomoon-social/
                fonts/
                    /...
                fonts.min.css
        images/
            /...
    index.html
dist/
    css/
        styles.min.css
    js/
        scripts.min.js
    icomoon/
        icomoon-front/
            fonts/
                /...
            fonts.min.css
        icomoon-social/
            fonts/
                /...
            fonts.min.css
    images/
        /...
index.html
```

## 🔑 Required

### Dependencies

- [Node](https://nodejs.org/es/)
- [NPM](https://docs.npmjs.com/)
- [Gulp](https://gulpjs.com/)

### Files

- `package.json`
- `gulpfile.js`

## 🚀 Commands

### Generic commands

#### Install dependencies

```shell
npm install
```

#### Build files, run server and watch changes

```shell
gulp
```

#### Create and run server

```shell
gulp serve
```

#### Watch for changes

```shell
gulp watch
```

### Frontend and backend commands

#### Build files

```shell
gulp front-build
```

```shell
gulp back-build
```

#### Build CSS files

```shell
gulp front-css
```

```shell
gulp back-css
```

#### Build JS files

```shell
gulp front-js
```

```shell
gulp back-js
```

#### Build icon files

```shell
gulp front-icon
```

```shell
gulp back-icon
```

#### Build image files

```shell
gulp front-img
```

```shell
gulp back-img
```

## 🔗 References

Here I leave a link [to continue](https://gulpjs.com/docs/en/getting-started/quick-start) you can add more tasks if you need.
