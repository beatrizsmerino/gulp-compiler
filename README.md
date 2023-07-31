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

## 🏗️ Developed with

![HTML5](https://img.shields.io/badge/-HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
[![CSS Specificity Graph Generator](https://img.shields.io/badge/-Css3-2173F6?style=for-the-badge&logo=css3&logoColor=white)](https://jonassebastianohlsson.com/specificity-graph/)
[![SASS/SCSS](https://img.shields.io/badge/-SASS/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white)](https://sass-lang.com/)
[![BEM](https://img.shields.io/badge/-BEM-000000?style=for-the-badge&logo=bem&logoColor=white)](https://en.bem.info/methodology/)
[![ITCSS](https://img.shields.io/badge/-ITCSS-ff2c59?style=for-the-badge)](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/#tips-on-using-itcss)
[![BEMIT](https://img.shields.io/badge/-BEMIT-c84747?style=for-the-badge)](https://csswizardry.com/2015/08/bemit-taking-the-bem-naming-convention-a-step-further/)
![Javascript](https://img.shields.io/badge/-Javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
[![JQuery](https://img.shields.io/badge/-JQuery-183353?style=for-the-badge&logo=JQuery&logoColor=white)](https://jquery.com/)
[![jQuery Validation](https://img.shields.io/badge/-jQuery%20Validation-bb002b?style=for-the-badge&logo=jquery&logoColor=white)](https://jqueryvalidation.org/)
[![Isotope Layout](https://img.shields.io/badge/isotope%20layout-ffbb44?style=for-the-badge)](https://isotope.metafizzy.co/)
[![Swiper](https://img.shields.io/badge/swiper-6332F6?style=for-the-badge&logo=swiper&logoColor=white)](https://swiperjs.com/get-started)
![Bash](https://img.shields.io/badge/Bash-3D4648?style=for-the-badge&logo=gnu-bash&logoColor=white)
![NPM](https://img.shields.io/badge/-NPM-CB3837?style=for-the-badge&logo=npm&logoColor=white)
[![Gulp](https://img.shields.io/badge/-Gulp-D34A47?style=for-the-badge&logo=gulp&logoColor=white)](https://gulpjs.com)
[![Autoprefixer](https://img.shields.io/badge/-Autoprefixer-FF9900?style=for-the-badge&logo=autoprefixer&logoColor=white)](https://www.npmjs.com/package/autoprefixer)
[![Babel](https://img.shields.io/badge/-babel-F9DC3E?style=for-the-badge&logo=babel&logoColor=000000)](https://babeljs.io/)
[![Icomoon](https://img.shields.io/badge/-Icomoon-02A8F3?style=for-the-badge&logo=icomoon&logoColor=white)](https://icomoon.io/app/#/select)

## 🔑 Required

### Dependencies

You must have the following dependencies installed globally on your computer:

- [Node 14](https://nodejs.org/es/)
- [NPM 6](https://docs.npmjs.com/)
- [Gulp 4](https://gulpjs.com/)

### Files

- `package.json`
- `gulpfile.js`

## 🧩 Content

### Frontend and backend structure

The tasks collect the necessary files from the `src` folder and generate a new `dist` folder containing the processed and optimized results.

The website interface has a `frontend` (visible for all users to interact with) and a `backend` (accessible only to the client that manages the website). Both parts have the same folder and file structure, where the frontend files are located in the root of the project and the backend files inside the `admin` folder located in the root of the project.

```shell
📦 node_modules/
    📂 /...
📁 admin/
    📁 src/
    📁 dist/
📁 src/
📁 dist/
```

### Input and output structure

The automated tasks in the `gulpfile.js` include several important functions:

1. Concatenation of `CSS` files of external libraries from `node_modules` folder and compilation of partials `SASS` files, to generate a single minified file.
2. Compilation of external libraries from `node_modules` folder and partials `JS` files into a single minified file.
3. Copying of fonts and minification of css icons, obtained from the online tool `Icomoon`.
4. Copy and compression of `Images`, to improve website performance by reducing its size without compromising its visual quality.

#### Input folders and files

```shell
📁 src/
    📁 sass/
        📂 /...
        📄 styles.sass
    📁 js/
        📂 /...
        📄 scripts.js
    📁 icomoon/
        📁 icomoon-social/
            📁 fonts/
                📂 /...
            📄 fonts.css
        📂 /...
    📁 images/
        📂 /...
📄 index.html
```

#### Output folders and files

```shell
📁 dist/
    📁 css/
        📄 styles.min.css
    📁 js/
        📄 scripts.min.js
    📁 icomoon/
        📁 icomoon-social/
            📁 fonts/
                📂 /...
            📄 fonts.min.css
        📂 /...
    📁 images/
        📂 /...
📄 index.html
```

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
