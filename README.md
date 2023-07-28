![shieldsIO](https://img.shields.io/github/issues/beatrizsmerino/gulp-compiler)
![shieldsIO](https://img.shields.io/github/forks/beatrizsmerino/gulp-compiler)
![shieldsIO](https://img.shields.io/github/stars/beatrizsmerino/gulp-compiler)

# Gulp compiler

![Image of Gulp Compiler](README/images/gulp-logo-gulpfile-front-back.png)

Gulp Compiler is a basic code for automate the tasks of your development environment, compile `SASS` and `JS` with the task runner `Gulp`.

## Development interface

Is developed with [gulp](https://gulpjs.com/) 4.0.0 a task runner and javascript.

### Content

The `SASS` and `JS` compilation tasks pick up the files in the `src` folder and generate a new `dist` folder with the results.

#### Input structure folders

```shell
gulp-compiler
    admin/
        src/
            images/
            icomoon/
                icomoon-back/
                    **/*
                icomoon-social/
                    **/*
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
    src/
        images/
            **/*
        icomoon/
            icomoon-front/
                **/*
            icomoon-social/
                **/*
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

#### Output structure folders

```shell
gulp-compiler
    admin/
        dist/
            images/
                **/*
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
            **/*
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

#### Necessary files

- _package.json_: Configuration file
- _gulpfile.js_: Specify possible tasks

## How use

### To use it is necessary have installed

- [Node](https://nodejs.org/es/)

    ```shell
    node --version
    ```

- [NPM](https://docs.npmjs.com/)

    ```shell
    npm install
    npm --version
    ```

- [Gulp 4.0.0](https://gulpjs.com/)

    ```shell
    npm install --global gulp-cli
    npm install gulp
    gulp --version
    ```

### If you already have node, npm and gulp

After installing everything you need, you must launch the command, for download the packages the 'devDependencies' of configuration file.

```shell
npm install
```

### Tasks availables

You can start the following tasks using the command console while in the project folder.

```shell
gulp
```

#### Front

```shell
gulp front
gulp front-css
gulp front-js
gulp front-icon
gulp front-img
```

```shell
gulp front__cssIcomoonMinify
gulp front__cssIcomoonCopy
gulp front__cssIcomoonSocialMinify
gulp front__cssIcomoonSocialCopy
gulp front__sassCompile
gulp front__cssCompile
gulp front__jsCompile
gulp front__imageMinify
```

#### Back

```shell
gulp back
gulp back-css
gulp back-js
gulp back-icon
gulp back-img
```

```shell
gulp back__cssIcomoonMinify
gulp back__cssIcomoonCopy
gulp back__cssIcomoonSocialMinify
gulp back__cssIcomoonSocialCopy
gulp back__sassCompile
gulp back__cssCompile
gulp back__jsCompile
gulp back__imageMinify
```

## Continue

Here I leave a link [to continue](https://gulpjs.com/docs/en/getting-started/quick-start) you can add more task if you need.
