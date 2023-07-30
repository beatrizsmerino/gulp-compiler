![GitHub dependabot](https://img.shields.io/badge/dependabot-enabled-025e8c?logo=Dependabot)
![GitHub last commit](https://img.shields.io/github/last-commit/beatrizsmerino/gulp-compiler)
![GitHub issues](https://img.shields.io/github/issues/beatrizsmerino/gulp-compiler)
![GitHub forks](https://img.shields.io/github/forks/beatrizsmerino/gulp-compiler)
![GitHub stars](https://img.shields.io/github/stars/beatrizsmerino/gulp-compiler)
![GitHub watchers](https://img.shields.io/github/watchers/beatrizsmerino/gulp-compiler)

# Gulp compiler

![Image of Gulp Compiler](README/images/gulp-logo.png)

## Description

This repository is a basic code for automate the tasks of your development environment, compile `SASS` and `JS` with the task runner `Gulp`.

## Content

Is developed with [gulp](https://gulpjs.com/) 4.0.0 a task runner and javascript.

The `SASS` and `JS` compilation tasks pick up the files in the `src` folder and generate a new `dist` folder with the results.

### Input structure folders

```shell
admin/
    src/
        images/
        icomoon/
            icomoon-back/
                fonts/
                fonts.css
            icomoon-social/
                fonts/
                fonts.css
        sass/
            styles.sass
        js/
            scripts.js
src/
    images/
    icomoon/
        icomoon-front/
            fonts/
            fonts.css
        icomoon-social/
            fonts/
            fonts.css
    sass/
        styles.sass
    js/
        scripts.js
```

### Output structure folders

```shell
admin/
    dist/
        images/
        icomoon/
            icomoon-back/
                fonts/
                fonts.min.css
            icomoon-social/
                fonts/
                fonts.min.css
        css/
            styles.min.css
        js/
            scripts.min.js
dist/
    images/
    icomoon/
        icomoon-front/
            fonts/
            fonts.min.css
        icomoon-social/
            fonts/
            fonts.min.css
    css/
        styles.min.css
    js/
        scripts.min.js
```

## Required

### Dependencies

- [Node](https://nodejs.org/es/)
- [NPM](https://docs.npmjs.com/)
- [Gulp](https://gulpjs.com/)

### Files

- `package.json`
- `gulpfile.js`

## Commands

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

## References

Here I leave a link [to continue](https://gulpjs.com/docs/en/getting-started/quick-start) you can add more tasks if you need.
