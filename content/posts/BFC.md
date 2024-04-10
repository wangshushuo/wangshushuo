# CSS 的 BFC

## BFC 定义

- **Block Formatting Context**
  - 是 Web 页面的可视 CSS 渲染的一部分，
  - 决定了元素如何对其内容进行定位，
  - 以及与其他元素的关系和相互作用。

## BFC 特性

- **内部的 Box 会在垂直方向上一个接一个地放置。**
- **属于同一个 BFC 的两个相邻 Box 的 margin 会发生重叠。**
- **每个元素的左外边缘与包含块的左边缘相接触（对于从右到左的格式，右边缘相接触）。**
- **BFC 的区域不会与 float box 重叠。**
- **BFC 是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。**
- **计算 BFC 的高度时，浮动元素也参与计算。**

## 如何创建 BFC

- **根元素或其他包含它的元素**
- **浮动元素（元素的 float 不是 none）**
- **绝对定位元素（元素的 position 为 absolute 或 fixed）**
- **行内块元素（元素的 display 为 inline-block）**
- **表格单元格（元素的 display 为 table-cell，HTML 表格单元格默认值）**
- **表格标题（元素的 display 为 table-caption，HTML 表格标题默认值）**
- **匿名表格单元格元素，元素的 display 为** 
  - table、
  - table-row、
  - table-row-group、
  - table-header-group、
  - table-footer-group
- **overflow 值不为 visible 的块元素**

## BFC 应用场景

- **防止 margin 重叠**
- **与浮动元素的交互**
  - 可以用来清除内部浮动（清除浮动的影响）
- **自适应两栏布局**