# 用embed解决CLI程序使用模板文件

QUESTION:

用go install gitee.com/wanghsushuo/proxy@latest安装了程序，但是程序的代码中用到了一个模板文件，导致运行proxy时程序报错找不到模板文件，可以用go embed解决这个问题吗？

ANSWER:

是的，你可以使用Go 1.16引入的 `//go:embed` 功能来解决这个问题。`//go:embed` 可以将资源文件内容直接打包到二进制文件，方便部署。它可以将任何文件或者文件夹的内容打包到编译出的可执行文件中。如果要嵌入文件，变量的类型得是 `string` 或者 `[]byte`，如果要嵌入一组文件，变量的类型得是 `embed.FS`[Source 7](https://taoshu.in/go/how-to-use-go-embed.html)。

假设你的模板文件位于 `templates` 目录下，你可以使用以下代码将其嵌入到你的程序中:

```go
package main

import (
    "embed"
    "html/template"
    "os"
)

//go:embed templates/*.tmpl
var tpls embed.FS

func main() {
    t, err := template.ParseFS(tpls, "templates/*")
    if err != nil {
        panic(err)
    }
    // 假设有一个名为 index.tmpl 的模板
    if err = t.ExecuteTemplate(os.Stdout, "index.tmpl", nil); err != nil {
        panic(err)
    }
}
```

这段代码首先使用 `//go:embed` 指令将 `templates` 目录下的所有 `.tmpl` 文件嵌入到 `tpls` 变量中，然后使用 `template.ParseFS` 函数从 `tpls` 中解析出所有的模板。最后，`t.ExecuteTemplate` 函数被用来执行特定的模板并将结果写入 `os.Stdout`。

注意，`//go:embed` 指令只能用于包级别的变量，不能用于函数内部的局部变量[Source 7](https://taoshu.in/go/how-to-use-go-embed.html)。另外，如果你的模板文件在子目录中，你需要在解析模板时包含子目录的路径，如上述代码中的 `"templates/*"`。

使用这种方式，你的模板文件将被编译到可执行文件中，无论你的程序在哪里运行，它都能找到这些模板文件，从而解决了你的问题。