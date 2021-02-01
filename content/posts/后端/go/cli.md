---
title: Cli
url: /Cli.html
date: 2021-01-31T22:26:41+08:00
---
cli: https://github.com/urfave/cli/blob/master/docs/v2/manual.md

交互式: https://github.com/manifoldco/promptui

```go
app := &cli.App{
		Flags: []cli.Flag {
			&cli.StringFlag{
        Name:        "lang",
        Aliases:     []string{"l"},
				Value:       "english",
				Usage:       "language for the greeting",
				Destination: &language,
			},
		},
		Action: func(c *cli.Context) error {
			name := "someone"
			if c.NArg() > 0 {
				name = c.Args().Get(0)
			}
			if language == "spanish" {
				fmt.Println("Hola", name)
			} else {
				fmt.Println("Hello", name)
			}
			return nil
		},
	}
```

这段代码里既有 arguments 又有 flag 。在使用命令时，要先输入 flag 后输入 arg

```
go run main.go -lang=spanish wangshushuo
```
flag 部分有多种用法可选：
- -lang=abc
- --lang=abc
- --lang abc

如果定义里 Aliase 还可以
- -l abc

## 环境变量

定义 EnvVars 可以用来读取环境变量
```
app := &cli.App{
  Flags: []cli.Flag{
    &cli.StringFlag{
      Name:    "lang",
      Aliases: []string{"l"},
      Value:   "english",
      Usage:   "language for the greeting",
      EnvVars: []string{"LEGACY_COMPAT_LANG", "APP_LANG", "LANG"},
    },
  },
}
```

## 从文件中取值
FilePath
```
app.Flags = []cli.Flag {
  &cli.StringFlag{
    Name: "password",
    Aliases: []string{"p"},
    Usage: "password for the mysql database",
    FilePath: "/etc/mysql/password",
  },
}
```

文件比环境变量的优先级高。

## 交互式的获取值

```
	var language string

	prompt := promptui.Select{
		Label: "Select Day",
		Items: []string{"spanish", "english", "chinese"},
	}

	_, language, err := prompt.Run()

	app := &cli.App{
		Action: func(c *cli.Context) error {
			name := "someone"
			if c.NArg() > 0 {
				name = c.Args().Get(0)
			}
			if language == "spanish" {
				fmt.Println("Hola", name)
			} else {
				fmt.Println("Hello", name)
			}
			return nil
		},
	}
```