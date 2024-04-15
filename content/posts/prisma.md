---
title: prisma
date: 2024-04-11T23:39:44+08:00
---
# Prisma ORM 使用指南

## 简介

- **Prisma ORM**
  - 是一个开源数据库工具集
  - 用于简化数据库操作
  - 支持多种数据库

## 安装 Prisma

### 2. 安装 Prisma CLI

- 使用 npm 或 yarn 安装
  ```bash
  npm install prisma --save-dev
  ```

### 3. 初始化 Prisma

- 生成 Prisma 配置文件
  ```bash
  npx prisma init
  ```

## 配置数据库

### 1. 配置 `.env` 文件

- 在项目根目录的 `.env` 文件中配置数据库连接字符串
  ```plaintext
  DATABASE_URL="your_database_connection_string"
  ```

### 2. 定义数据模型

- 在 `prisma/schema.prisma` 文件中定义数据模型
  ```prisma
  model Post {
    id        Int      @id @default(autoincrement())
    title     String
    content   String?
    published Boolean  @default(false)
    createdAt DateTime @default(now())
  }
  ```

## 数据库迁移

### 1. 创建迁移文件

- 根据数据模型生成数据库迁移文件
  ```bash
  npx prisma migrate dev --name init
  ```

### 2. 应用迁移

- 迁移文件会自动应用到数据库

## 使用 Prisma Client

### 1. 生成 Prisma Client

- 生成与数据模型对应的 Prisma Client
  ```bash
  npx prisma generate
  ```

### 2. 使用 Prisma Client 进行数据库操作

- 在代码中导入并使用 Prisma Client
  ```javascript
  const { PrismaClient } = require('@prisma/client')
  const prisma = new PrismaClient()

  async function main() {
    const post = await prisma.post.create({
      data: {
        title: 'Hello World',
        content: 'This is my first post',
        published: true,
      },
    })
    console.log(post)
  }

  main()
    .catch((e) => {
      throw e
    })
    .finally(async () => {
      await prisma.$disconnect()
    })
  ```

## 总结

- Prisma ORM 提供了一种简单高效的方式来操作数据库
- 通过定义数据模型、生成迁移文件和使用 Prisma Client，可以轻松完成数据库的操作和访问