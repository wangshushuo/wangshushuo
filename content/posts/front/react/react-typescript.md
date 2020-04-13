---
title: Typescript & React
date: 2019-01-20T14:15:47+00:00
url: /typescript-react.html
categories:
- api
- 前端
- React

---
## 0. 类型
input的onChange事件，ChangeEvent是event.target，FormEvent是event.currentTarget
```ts
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value) {
            setKeywords(event.target.value);
            props.onUpdateKeyword(event.target.value);
        }
    }
```

## 1. 创建项目

[creact-react-app][1]可以直接创建typescript项目。

<pre class="wp-block-code"><code>create-react-app my-app --scripts-version=react-scripts-ts</code></pre>

## 2. 修改配置

2.1. -把tslint.json修改为这样，能舒服一点：

<pre class="wp-block-code"><code>{
  "extends": ["tslint:recommended", "tslint-react", "tslint-config-prettier"],
  "defaultSeverity": "warning",
  "linterOptions": {
    "exclude": [
      "config/**/*.js",
      "node_modules/**/*.ts",
      "coverage/lcov-report/*.js"
    ]
  },
  "rules": {
    "object-literal-sort-keys": false,
    "no-console": false
  }
}</code></pre>

2.2. 在package.json的script中加入这条，可以让tslint自动修复问题：

<pre class="wp-block-code"><code>"lint": "tslint --fix -c ./tslint.json 'src/**/*{.ts,.tsx}'"</code></pre>

千万要注意，你的代码将被修改，所以要[注意以下事项][2]⚠️：

  * Commit the changes you have made to your code
  * Run TSLint with the `--fix` flag like above
  * Quickly review the changes TSLint has made
  * Make a new commit with these changes, or simply amend them to your previous commit

## 3. 各种类型怎么定义  

class组件需要定义props和state的类型：

<pre class="wp-block-code"><code>interface IProps {
  addTodo: (input: string) => void;
}
interface IState {
  input: string;
}
class AddTodo extends React.Component&lt;IProps, IState>{}</code></pre>

input事件需要定义事件类型：

<pre class="wp-block-code"><code>  public handleInput(event:React.ChangeEvent&lt;HTMLInputElement>) {
    this.updateInput(event.target.value);
  }</code></pre>

HTMLInputElement还可能是HTMLSelectElement等。

.d.ts文件是使用js编写的api才用的。

 [1]: https://github.com/Microsoft/TypeScript-React-Starter#typescript-react-starter
 [2]: https://stackoverflow.com/a/44850320/6021280