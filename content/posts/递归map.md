---
title: 递归map
url: /递归map.html
date: 2023-02-27T18:30:57+08:00
categories:
- js
---

```js
const criteria = {"operator":"and","values":[{"operator":"and","values":[{"operator":"and","values":[{"operator":"and","values":[{"operator":"and","values":[],"uid":"1593264704"},{"operator":"and","values":[],"uid":"283583839"}],"uid":"306590514"},{"operator":"and","values":[],"uid":"1899400818"},{"operator":"and","values":[],"uid":"1809313610"}],"uid":"966087239"},{"operator":"and","values":[],"uid":"586805392"},{"operator":"and","values":[],"uid":"820862889"},{"operator":"and","values":[],"uid":"1622114136"}],"uid":"1198153895"},{"operator":"and","values":[{"operator":"and","values":[],"uid":"2096355855"},{"operator":"and","values":[],"uid":"360825872"}],"uid":"898380472"},{"operator":"and","values":[],"uid":"134584530"}],"uid":"913669697"}

const mapHandler = (i) => i.values.map(mapHandler);
let values = criteria.values.map(mapHandler);
values = flattenDeep(values)
if (values.length === 0) {
    criteriaStr = '';
    criteria.values = [];
}
```