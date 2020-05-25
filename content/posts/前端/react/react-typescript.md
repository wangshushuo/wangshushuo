---
title: React 与 Typescript
date: 2019-01-20T14:15:47+00:00
url: /typescript-react.html
categories:
- React

---
## input的事件类型

需要注意两点。
1. 事件类型可能有两种 
  - `ChangeEvent` 对应 `event.target`
  - `FormEvent` 对应 `event.currentTarget`
2. 泛型对应元素，可能是`HTMLInputElement` 或 `HTMLSelectElement` 等。
```ts
const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
        setKeywords(event.target.value);
        props.onUpdateKeyword(event.target.value);
    }
}
```

## class组件的类型

class组件需要定义props和state的类型：
```
interface IProps {
  addTodo: (input: string) => void;
}
interface IState {
  input: string;
}
class AddTodo extends React.Component<IProps, IState>{}
```

## 创建项目

[creact-react-app][1]可以直接创建 typescript 项目。

```
create-react-app my-app --scripts-version=react-scripts-ts
```

## 修改配置

把 tslint.json 修改为这样，能舒服一点：

```
{
  "extends": [
    "tslint:recommended", 
    "tslint-react", 
    "tslint-config-prettier"
  ],
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
}
```

在package.json的script中加入这条，可以让tslint自动修复问题：

```
"lint": "tslint --fix -c ./tslint.json 'src/**/*{.ts,.tsx}'"
```

千万要注意，你的代码将被修改，所以要[注意以下事项][2]⚠️：

  * Commit the changes you have made to your code
  * Run TSLint with the `--fix` flag like above
  * Quickly review the changes TSLint has made
  * Make a new commit with these changes, or simply amend them to your previous commit




`.d.ts` 文件是使用js编写的api才用的。

 [1]: https://github.com/Microsoft/TypeScript-React-Starter#typescript-react-starter
 [2]: https://stackoverflow.com/a/44850320/6021280