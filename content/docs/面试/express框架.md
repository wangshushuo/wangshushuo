---
title: express框架的面试题
date: 2024-11-18T14:55:23.676Z
---

以下是一些关于 **Express 框架** 的常见面试题，涵盖基础知识到进阶使用：

---

### **基础知识**
1. **什么是 Express？它的主要特点是什么？**
    - 解答要点：Express 是一个基于 Node.js 的轻量级 Web 应用框架，主要特点是简洁、灵活、可扩展，提供了中间件和路由系统。

2. **Express 中间件是什么？有哪些类型的中间件？**
    - 解答要点：
        - 中间件是函数，可以对请求和响应对象进行处理。
        - 类型包括：
            - 内置中间件（如 `express.static`）
            - 应用级中间件
            - 路由级中间件
            - 第三方中间件（如 `body-parser`, `cors` 等）
            - 错误处理中间件

3. **如何处理静态资源？**
    - 解答要点：使用 `express.static` 中间件，例如：
      ```javascript
      app.use(express.static('public'));
      ```

4. **Express 中的路由是什么？如何定义一个路由？**
    - 解答要点：
        - 路由是定义如何响应客户端请求的规则。
        - 示例：
          ```javascript
          app.get('/user', (req, res) => {
            res.send('User Page');
          });
          ```

5. **如何解析 JSON 和 URL 编码数据？**
    - 解答要点：使用 `express.json()` 和 `express.urlencoded()` 中间件。
      ```javascript
      app.use(express.json());
      app.use(express.urlencoded({ extended: true }));
      ```

---

### **进阶问题**
6. **如何实现一个全局错误处理器？**
    - 解答要点：
        - 错误处理中间件有 4 个参数：`err`, `req`, `res`, `next`。
        - 示例：
          ```javascript
          app.use((err, req, res, next) => {
            console.error(err.stack);
            res.status(500).send('Something broke!');
          });
          ```

7. **如何实现自定义中间件？**
    - 解答要点：
        - 自定义中间件是一个接受 `(req, res, next)` 参数的函数。
        - 示例：
          ```javascript
          app.use((req, res, next) => {
            console.log(`Request URL: ${req.url}`);
            next();
          });
          ```

8. **解释什么是链式路由调用？如何使用？**
    - 解答要点：链式调用是将多个 HTTP 方法绑定到同一路由上。
      ```javascript
      app.route('/book')
        .get((req, res) => {
          res.send('Get a book');
        })
        .post((req, res) => {
          res.send('Add a book');
        })
        .put((req, res) => {
          res.send('Update a book');
        });
      ```

9. **如何处理跨域问题？**
    - 解答要点：
        - 使用第三方中间件 `cors`。
          ```javascript
          const cors = require('cors');
          app.use(cors());
          ```

10. **如何优化性能（如处理高并发）？**
    - 解答要点：
        - 使用负载均衡（如 PM2 和集群模式）。
        - 压缩响应数据（如 `compression` 中间件）。
        - 使用缓存（如 Redis 或本地缓存）。
        - 异步处理 I/O 操作（如数据库查询）。

---

### **场景题**
11. **如何为某些路由添加认证逻辑？**
    - 解答要点：
        - 使用中间件检查认证信息。
          ```javascript
          const authMiddleware = (req, res, next) => {
            if (req.headers.authorization) {
              next();
            } else {
              res.status(401).send('Unauthorized');
            }
          };
  
          app.get('/protected', authMiddleware, (req, res) => {
            res.send('You are authenticated');
          });
          ```

12. **如何实现 RESTful API？请简单描述创建、读取、更新和删除的代码。**
    - 解答要点：
      ```javascript
      const express = require('express');
      const app = express();

      app.use(express.json());

      let items = [];

      app.get('/items', (req, res) => res.json(items)); // 读取
      app.post('/items', (req, res) => {
        items.push(req.body);
        res.status(201).send('Item added');
      }); // 创建
      app.put('/items/:id', (req, res) => {
        const id = req.params.id;
        items[id] = req.body;
        res.send('Item updated');
      }); // 更新
      app.delete('/items/:id', (req, res) => {
        items.splice(req.params.id, 1);
        res.send('Item deleted');
      }); // 删除

      app.listen(3000, () => console.log('Server running on port 3000'));
      ```

13. **如何实现文件上传？**
    - 解答要点：使用 `multer` 中间件。
      ```javascript
      const multer = require('multer');
      const upload = multer({ dest: 'uploads/' });

      app.post('/upload', upload.single('file'), (req, res) => {
        res.send(`File uploaded: ${req.file.originalname}`);
      });
      ```

---

### **加分问题**
14. **Express 与 Koa 的区别是什么？**
15. **如何安全地存储敏感信息（如 API 密钥或数据库密码）？**
16. **如何实现 WebSocket 通信功能？可以与 Express 配合使用吗？**

以上题目可以根据面试公司的侧重点调整，务必结合实际开发经验来回答，展示你的全栈能力！如果需要具体题目代码实现，可以进一步沟通 😊