---
title: WebStorm
url: /WebStorm.html
date: 2020-08-13T09:39:16+08:00
description: 编辑器常用的功能，vscode与WebStorm的配置和快捷键
categories:
- 其他
---

光标回到之前的位置：
1. mac：ctrl+`-` 和 ctrl+shift+`-`
1. windows：`alt+左/右`

## 常用设置

1. 自动保存的开关
1. 修改文件有*标记
1. 修改的文件的目录和文件的颜色都提示
1. Windows系统中使用\n换行符
1. 切换terminal

**修改默认terminal**

Ctrl+Alt+S 打开设置，选择 tools 目录，选择 terminal

**取消自动保存**

关闭自动保存功能

Settings for New Projects（Ctrl+Alt+S）→ Appearance & Behavior，定位到 Synchronization 一栏，取消勾选以下三项：

- Save files on frame deactivation
- Save files automatically if application is idle for [15] sec
- Use "safe write" (save changes to a temporary file first)

**打开修改文件后的星号提示**

Settings for New Projects（Ctrl+Alt+S）→ Editor → General → Editor Tabs，定位到 Appearance 一栏，勾选 Mark modified (*)。

**修改编译器字体**

Settings for New Projects（Ctrl+Alt+S）→ Editor → Font，Font 选择为 Fira Code，Size 设置为 12。

**设置文件换行符**

Settings for New Projects（Ctrl+Alt+S）→ Editor → Code Style，定位到 General 标签，Line separator 选择为 Unix and OS X (\n)。

**版本控制文件发生改变时上级目录也会有相应提示**

Settings for New Projects（Ctrl+Alt+S）→ Version Control，勾选 Show directories with changed descendants。

## 常用快捷键

操作 | WebStorm
:---|:---
重复选中的内容或当前行 | Ctrl+D
删除行 | Ctrl+Y
格式化代码 | Ctrl+Alt+L
按prettier格式化 | Ctrl+Shift+Alt+P
重命名 | Shift+F6
撤销或反撤销修改 | Ctrl+Z 或 Ctr+Shift+Z
回到之前的位置 | Ctrl+Alt+左\右
光标移到内容的开始或结束标签处 | ctrl+[ 或 ctrl+]
打开最近操作过的文件 | Ctrl+E
搜索文件 | Ctrl+Shift+N
在所有文件中列出代码使用情况 | Alt+F7
在当前文件中高亮代码使用情况 | Ctrl+Shift+F7


## 配置
**恢复默认配置**

只要删除 C:\Users\wxj\.WebStorm2018.3\config 目录，即可恢复默认配置。

**修改默认terminal**

Ctrl+Alt+S 打开设置，选择 tools 目录，选择 terminal

**显示内存指示器**

Settings for New Projects（Ctrl+Alt+S）→ Appearance & Behavior → Appearance，定位到 Window Options 一栏，勾选 Show memory indicator。

**取消自动打开项目**

Settings for New Projects（Ctrl+Alt+S）→ Appearance & Behavior → System Settings，定位到 Startup/Shutdown 一栏，取消勾选 Reopen last project on startup。

**取消自动保存**

关闭自动保存功能

Settings for New Projects（Ctrl+Alt+S）→ Appearance & Behavior，定位到 Synchronization 一栏，取消勾选以下三项：

- Save files on frame deactivation
- Save files automatically if application is idle for [15] sec
- Use "safe write" (save changes to a temporary file first)

**打开修改文件后的星号提示**

Settings for New Projects（Ctrl+Alt+S）→ Editor → General → Editor Tabs，定位到 Appearance 一栏，勾选 Mark modified (*)。

**关闭自动更新检查**

Settings for New Projects（Ctrl+Alt+S）→ System Settings → Updates，取消勾选 Automatically check updates for [Stable Releases]。

**启用软换行**

Settings for New Projects（Ctrl+Alt+S）→ Editor → General，定位到 Soft Wraps 一栏，勾选 Use soft wraps in editor。

Settings for New Projects（Ctrl+Alt+S）→ Editor → General → Console，勾选 Use soft wraps in console。

**修改编译器字体**

Settings for New Projects（Ctrl+Alt+S）→ Editor → Font，Font 选择为 Fira Code，Size 设置为 12。

**设置文件换行符**

Settings for New Projects（Ctrl+Alt+S）→ Editor → Code Style，定位到 General 标签，Line separator 选择为 Unix and OS X (\n)。

**设置工程和文件 UTF-8 编码**

Settings for New Projects（Ctrl+Alt+S）→ Editor → File Encodings，Global Encoding 选择为 UTF-8，Project Encoding 为 UTF-8。

定位到 Properties Files (*.properties) 一栏，Default encoding for properties files 选择为 UTF-8，但不要勾选 Transparent native-to-ascii conversion。

定位到 BOM for new UTF-8 files 一栏，Create UTF-8 files 选择为 with NO BOM。

**设置控制台 UTF-8 编码**

在 D:\Program Files\JetBrains\WebStorm 2018.3.5\bin\[webstorm|webstorm64].exe.vmoptions 文件末尾添加 -Dfile.encoding=UTF-8。

**版本控制文件发生改变时上级目录也会有相应提示**

Settings for New Projects（Ctrl+Alt+S）→ Version Control，勾选 Show directories with changed descendants。

**配置 GitHub 账户**

Settings for New Projects（Ctrl+Alt+S）→ Version Control → GitHub，点击 Add account (Alt+Insert)，在弹出的 Login In to Github 中分别填写 GitHub 账户名和密码，然后点击 Log In。最后勾选 Clone git repositories using ssh。

**配置 Git**

Settings for New Projects（Ctrl+Alt+S）→ Version Control → Git，Path to Git executable 选择 D:\Program Files\Git\bin\git.exe。

## 快捷键
以下所展示的快捷键是默认时的选择，即 Settings for New Projects（Ctrl+Alt+S）→ Keymap 中，选择的是 Default。

### 编辑代码

- 同步磁盘文件：Ctrl+Alt+Y
- 快速生成通用方法：Alt+Insert
- 注释和取消注释：Ctrl+/ 和 Ctrl+Shift+/
- 快速修复问题：Alt+Enter

### 阅读代码

- 隐藏所有工具窗口：Ctrl+Shift+F12
- 显示/隐藏工程目录窗口：Alt+1
- 移动窗口分割线：Ctrl+Shift+左箭头 或 Ctrl+Shift+左箭头
- 在工程目录中定位当前文件的位置：Alt+F1
- 显示说明文档：Ctrl+Q
- 折叠代码块：Ctrl+Shift+.
- 显示折叠后的代码块：Ctrl++
- 查看代码的定义：Ctrl+Shift+I
- 退出：Esc
- 导航至下一高亮处：F3
- 导航至上一高亮处：Shift+F3
- 取消高亮：Esc
- 跳至代码声明处：Ctrl+B 或 Ctrl+鼠标左键
- 跳至代码实现处：Ctrl+Alt+B 或 Ctrl+Alt+鼠标左键
- 跳至父类代码：Ctrl+U
- 导航文件中的各成员：Ctrl+F12
- 打开 UML 类图：Ctrl+Alt+U 或 Ctrl+Alt+Shift+U

### 打开文件

- 根据 Classes 打开文件：Ctrl+N
- 根据文件名打开所有文件或定位目录：Ctrl+Shift+N
- 根据 Symbols 打开所有文件：Ctrl+Shift+Alt+N

### 打开配置

- 打开配置：Ctrl+Alt+S
- 搜索所有可用的操作（Actions）：Ctrl+Shift+A