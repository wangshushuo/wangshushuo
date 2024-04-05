当使用 **`new`** 关键字调用函数时，该函数将被用作构造函数。`new` 将执行以下操作：

1. 创建一个空的简单 JavaScript 对象。为方便起见，我们称之为 `newInstance`。
2. 如果构造函数的 `prototype` 属性是一个[对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object)，则将 `newInstance` 的 [[Prototype]] 指向构造函数的 `prototype` 属性，否则 `newInstance` 将保持为一个普通对象，其 [[Prototype]] 为 `Object.prototype`。
3. 使用给定参数执行构造函数，并将 `newInstance` 绑定为 [`this`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this) 的上下文（换句话说，在构造函数中的所有 `this` 引用都指向 `newInstance`）。
4. 如果构造函数返回[非原始值](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures#%E5%8E%9F%E5%A7%8B%E5%80%BC)，则该返回值成为整个 `new` 表达式的结果。否则，如果构造函数未返回任何值或返回了一个原始值，则返回 `newInstance`。（通常构造函数不返回值，但可以选择返回值，以覆盖正常的对象创建过程。）

根据 MDN 中对 `new` 操作符的描述，我们可以实现一个名为 `myNew` 的函数来模拟 `new` 操作符的行为。下面是一个简单的实现：

```javascript
function myNew(constructor, ...args) {
  // 步骤 1：创建一个空的简单 JavaScript 对象
  const newInstance = {};

  // 步骤 2：将 newInstance 的 [[Prototype]] 指向构造函数的 prototype 属性
  if (constructor.prototype !== null && typeof constructor.prototype === 'object') {
    Object.setPrototypeOf(newInstance, constructor.prototype);
  }

  // 步骤 3：使用给定参数执行构造函数，并将 newInstance 绑定为 this 的上下文
  const result = constructor.apply(newInstance, args);

  // 步骤 4：如果构造函数返回非原始值，则返回该值；否则返回 newInstance
  return typeof result === 'object' && result !== null ? result : newInstance;
}
```

使用这个 `myNew` 函数可以模拟 `new` 操作符的行为。例如：

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.sayHello = function() {
  console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
};

const john = myNew(Person, 'John', 30);
john.sayHello(); // 输出：Hello, my name is John and I am 30 years old.
```

这样，我们就实现了一个简单的 `myNew` 函数来模拟 `new` 操作符的行为，根据 MDN 中的描述创建了一个新的对象，并正确地设置了它的原型链、执行了构造函数，并返回了正确的实例对象。