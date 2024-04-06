---
title: Wasm
date: 2023-09-01T14:57:20+08:00
categories:
- javascript
- go
---

```go
package main

import (
	"syscall/js"
)

// list function
func list() string {
	// Your code here
	return "List Result"
}

// status function
func status() string {
	// Your code here
	return "Status Result"
}

func main() {
	js.Global().Set("list", js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		return list()
	}))

	js.Global().Set("envStatus", js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		return status()
	}))

	// Wait for the callbacks to be called
	select {}
}
```

用powershell编译
```powershell
$env:GOOS="js"; $env:GOARCH="wasm"; go build -o main.wasm main.go
```

用shell编译
```shell
GOOS=js GOARCH=wasm go build -o main.wasm main.go
```

```html
<script src="src/lib/wasm_exec.js"></script>
<script>
    const go = new Go(); // Defined in wasm_exec.js
    WebAssembly.instantiateStreaming(fetch('src/lib/main2.wasm'), go.importObject).then((result) => {
        go.run(result.instance);

        console.log(window.list());
        console.log(window.envStatus());
    });
</script>
```

wasm_exec.js是Go语言工具链自带的一个文件，它提供了Go编译的WebAssembly模块与JavaScript环境之间的桥梁。当在Go中使用syscall/js包时，wasm_exec.js提供了必要的函数和方法来处理JavaScript的回调和其他交互。

wasm_exec.js文件通常位于Go的安装目录下的misc/wasm文件夹中。你可以在命令行中使用以下命令来找到并复制这个文件到你的项目目录中：

```
cp "$(go env GOROOT)/misc/wasm/wasm_exec.js" .
```