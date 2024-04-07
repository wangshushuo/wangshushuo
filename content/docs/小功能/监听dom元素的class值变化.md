---
title: 监听dom元素的class值变化
date: 2022-04-25T15:32:41+08:00
---
参考资料：
1. [stackoverflow](https://stackoverflow.com/a/53914092/6021280)  
2. [MDN文档：MutationObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver)
## MutationObserver

这个类可以监听指定 `DOM` 的变化。

下面的代码创建监听了一个元素，并在class变化时出发回调函数。

```js
let targetNode = document.getElementById('test')

function workOnClassAdd() {
    alert("I'm triggered when the class is added")
}

function workOnClassRemoval() {
    alert("I'm triggered when the class is removed")
}

// watch for a specific class change
let classWatcher = new ClassWatcher(targetNode, 'trigger', workOnClassAdd, workOnClassRemoval)

// tests:
targetNode.classList.add('trigger') // triggers workOnClassAdd callback
targetNode.classList.add('trigger') // won't trigger (class is already exist)
targetNode.classList.add('another-class') // won't trigger (class is not watched)
targetNode.classList.remove('trigger') // triggers workOnClassRemoval callback
targetNode.classList.remove('trigger') // won't trigger (class was already removed)
targetNode.setAttribute('disabled', true) // won't trigger (the class is unchanged)
```

```js
class ClassWatcher {

    constructor(targetNode, classToWatch, classAddedCallback, classRemovedCallback) {
        this.targetNode = targetNode
        this.classToWatch = classToWatch
        this.classAddedCallback = classAddedCallback
        this.classRemovedCallback = classRemovedCallback
        this.observer = null
        this.lastClassState = targetNode.classList.contains(this.classToWatch)

        this.init()
    }

    init() {
        this.observer = new MutationObserver(this.mutationCallback)
        this.observe()
    }

    observe() {
        this.observer.observe(this.targetNode, { attributes: true })
    }

    disconnect() {
        this.observer.disconnect()
    }

    mutationCallback = mutationsList => {
        for(let mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                let currentClassState = mutation.target.classList.contains(this.classToWatch)
                if(this.lastClassState !== currentClassState) {
                    this.lastClassState = currentClassState
                    if(currentClassState) {
                        this.classAddedCallback()
                    }
                    else {
                        this.classRemovedCallback()
                    }
                }
            }
        }
    }
}
```
