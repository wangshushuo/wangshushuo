---
date: 2024-04-03
title: Webpack
---
## Loader 和 Plugin

Webpack 中的 Loader 和 Plugin 是两个不同的概念，它们分别用于处理不同的任务：

1. **Loader**：
   - Loader 用于对模块的源代码进行转换和处理，通常用于加载和转换各种类型的文件，比如将 ES6/ES7 代码转换为 ES5、将 SCSS 文件转换为 CSS 等。
   - Loader 是一个函数或者一个模块，它接受源文件作为输入，并返回转换后的文件内容。

2. **Plugin**：
   - Plugin 用于扩展 Webpack 的功能，在构建过程中执行各种任务，比如打包优化、资源管理、环境变量注入等。
   - Plugin 是一个具有 apply 方法的 JavaScript 对象，它会在 Webpack 的不同生命周期中被调用，并可以访问到整个编译过程中的各种信息和资源。

下面分别展示如何实现一个自定义的 Loader 和 Plugin：

**自定义 Loader 示例**：

假设我们要实现一个简单的 Loader，将源代码中的每个单词首字母大写。首先创建一个 `capitalize-loader.js` 文件：

```javascript
module.exports = function(source) {
  // 将源代码中每个单词的首字母大写
  return source.replace(/\b\w/g, function(match) {
    return match.toUpperCase();
  });
};
```

然后在 Webpack 配置文件中配置该 Loader：

```javascript
module: {
  rules: [
    {
      test: /\.txt$/, // 匹配 .txt 文件
      use: 'capitalize-loader' // 使用 capitalize-loader 处理 .txt 文件
    }
  ]
}
```

现在，当 Webpack 在处理 `.txt` 文件时，会自动使用我们定义的 `capitalize-loader` 来处理文件内容。

**自定义 Plugin 示例**：

假设我们要实现一个简单的 Plugin，在 Webpack 构建完成后，在控制台输出构建结果的信息。首先创建一个 `ConsoleLogPlugin.js` 文件：

```javascript
class ConsoleLogPlugin {
  apply(compiler) {
    compiler.hooks.done.tap('ConsoleLogPlugin', stats => {
      console.log('Build is done. Here are the stats:');
      console.log(stats.toString());
    });
  }
}

module.exports = ConsoleLogPlugin;
```

然后在 Webpack 配置文件中配置该 Plugin：

```javascript
const ConsoleLogPlugin = require('./ConsoleLogPlugin');

module.exports = {
  // 其他配置...
  plugins: [
    new ConsoleLogPlugin()
  ]
};
```

现在，当 Webpack 构建完成后，我们自定义的 Plugin 将会在控制台输出构建结果的信息。

## 生命周期钩子

Webpack 中常用的生命周期钩子（hooks）包括以下几种：

1. **环境准备（Environment Options）**：
   - `webpackOptionsValidationError`: 当配置文件验证失败时触发。
   - `environment`: 在读取配置文件之前触发。

2. **编译过程（Compilation Process）**：
   - `beforeRun`: 在 Compiler 执行构建之前触发。
   - `run`: 在 Compiler 执行构建时触发。
   - `watchRun`: 在 Compiler 执行 Watch 模式构建时触发。
   - `normalModuleFactory`: 在创建 NormalModuleFactory 之后，创建 NormalModule 之前触发。
   - `contextModuleFactory`: 在创建 ContextModuleFactory 之后，创建 ContextModule 之前触发。
   - `beforeCompile`: 在编译器开始编译之前触发。
   - `compile`: 在编译器开始编译时触发。
   - `thisCompilation`: 在每次新的 Compilation 创建之后触发。
   - `compilation`: 在每次新的 Compilation 创建之后触发。
   - `make`: 在 Compilation 创建后触发，用于生成编译模块的资源。
   - `afterCompile`: 在编译器完成编译之后触发。

3. **构建过程（Building Process）**：
   - `emit`: 在生成资源到 output 目录之前触发。
   - `afterEmit`: 在生成资源到 output 目录之后触发。
   - `done`: 在编译器完成所有工作后触发。

4. **构建优化（Build Optimizations）**：
   - `thisCompilation`: 在每次新的 Compilation 创建之后触发。
   - `optimize`: 在编译器开始优化之前触发。
   - `optimizeAssets`: 在优化资源之前触发。
   - `optimizeChunks`: 在优化 chunks 之前触发。
   - `optimizeTree`: 在构建树优化之前触发。
   - `afterOptimizeTree`: 在构建树优化之后触发。

5. **构建完成（Build Completion）**：
   - `done`: 在编译器完成所有工作后触发。
   - `failed`: 在编译失败时触发。

以上是 Webpack 中常用的生命周期钩子，它们允许你在构建过程中的不同阶段执行自定义逻辑，以满足项目的特定需求或进行优化。通过监听这些钩子并注册相应的回调函数，你可以在构建过程中执行一些额外的操作，如代码分析、资源优化、错误处理等。