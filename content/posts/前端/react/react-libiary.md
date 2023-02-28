---
title: React 组件打包为 library

date: 2020-02-27T12:10:28+08:00
summary: 将一个 React 组件打包为一个 library，可以通过 npm 安装使用。
toc: false
categories:
- React
tags:
- handbook
---

在开发多个项目时，为了提到代码的复用，将一个 `React` 组件发不成一个独立的 `npm` 包是一个不错的方式。

这里参考 `reactjs-popup` 这个库。它的编译没有使用webpack等打包工具，它是使用 `bili` 和 `babel` 这两个库和自己写的脚本 `build.js` 文件进行的编译和打包。下面是 `build.js` 文件

```js
const fs = require('fs');
const del = require('del');
const Bili = require('bili');
const pkg = require('./package.json');

const options = {
  input: './src/index.js',
  outDir: 'lib',
  name: 'reactjs-popup',
  format: ['es', 'cjs', 'umd', 'umd-min'],
  banner: true,
  target: 'browser',
  external: Object.keys(pkg.peerDependencies),
};

// some confuse between babel config for parcel that use v6 and Bili that's use V7
const babelBiliConfig = {
  presets: [['@babel/preset-env', {modules: false}], '@babel/preset-react'],
  plugins: ['@babel/plugin-proposal-class-properties'],
};
const babelParcelConfig = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-react',
  ],
  plugins: ['@babel/plugin-proposal-class-properties'],
};

// Copy package.json, LICENSE,README and npmignore files
const writePackageFiles = () => {
  delete pkg.devDependencies;
  delete pkg.scripts;

  fs.writeFileSync(
    './lib/package.json',
    JSON.stringify(pkg, null, '  '),
    'utf-8',
  );
  fs.writeFileSync(
    './lib/LICENSE',
    fs.readFileSync('LICENSE', 'utf-8'),
    'utf-8',
  );
  fs.writeFileSync(
    './lib/README.md',
    fs.readFileSync('README.md', 'utf-8'),
    'utf-8',
  );
  fs.writeFileSync(
    'lib/.npmignore',
    fs.readFileSync('.npmignore', 'utf-8'),
    'utf-8',
  );
  fs.writeFileSync(
    './lib/index.d.ts',
    fs.readFileSync('src/index.d.ts', 'utf-8'),
    'utf-8',
  );
};

// and use babel config V7
// Clean up the output directory
const Build = () => {
  console.log('Delete old build Folder ....');
  del(['lib/*']).then(() => {
    fs.writeFileSync(
      './.babelrc',
      JSON.stringify(babelBiliConfig, null, '  '),
      'utf-8',
    );
    Bili.write(options).then(() => {
      fs.writeFileSync(
        './.babelrc',
        JSON.stringify(babelParcelConfig, null, '  '),
        'utf-8',
      );
    });

    writePackageFiles();
  });
};

let promise = Promise.resolve();
promise = promise.then(Build);

// catch errors
promise.catch(err => console.error(err.stack));

```

## 打包和使用

1. 复制了一份这个项目
1. 修改 `package.json` 、 `build.js` 和组件的代码
1. 我的组件叫做 `Test` 包叫做 `react-test-comp` 
1. 用它的方式打包
1. 上传项目到 git 仓库
1. 在项目中安装依赖
    ```
    yarn add git+https://xxx.xxx/react-test-comp.git
    ```
1. 在代码中使用
    ```js
    import Test from 'react-test-comp/lib';

    function App() {
      return (
        <div className="App">
          <Test text="wangshushuo" />
        </div>
      );
    }
    ```

有一个点需要注意。从 `git` 和 `npm` 安装依赖是有区别的. `git` 仓库的打包后的文件是在 `react-test-comp/lib` 目录下，而 `npm` 则是将 `lib` 目录上传到仓库，引用的时候就不需要 `/lib` 目录
