# UniNote 小程序前端

## 项目描述

这是UniNote微信小程序的前端界面代码，主要用于实现笔记管理的用户界面。

## 功能模块

- 笔记列表页 (pages/list/list)
- 笔记详情页 (pages/detail/detail)
- 创建笔记页 (pages/create/create)

## 项目配置

- AppID: wx6ce847999400de68
- 基础库版本: 3.7.12
- 编译设置: ES6、代码压缩、增强编译等

## 运行方式

1. 使用微信开发者工具导入项目
2. 确保项目配置中的AppID正确
3. 点击编译按钮运行项目

## 前端API配置

前端调用的后端API基础URL: http://localhost:8080/api/items

## API接口文档

### 数据管理接口

1. **分页查询**
   - 方法: GET
   - 路径: /api/items
   - 参数:
     - page: 页码(默认0)
     - size: 每页数量(默认10)
   - 返回: 分页后的Item列表

2. **创建条目**
   - 方法: POST
   - 路径: /api/items
   - 请求体: Item对象
   - 返回: 创建成功的Item对象

3. **获取条目详情**
   - 方法: GET
   - 路径: /api/items/{id}
   - 参数:
     - id: 条目ID
   - 返回: 对应的Item对象

## 项目结构

```
miniprogram/
├── app.js          # 小程序入口文件
├── app.json        # 全局配置
├── app.wxss        # 全局样式
├── pages/          # 页面目录
│   ├── create/     # 创建笔记页
│   ├── detail/     # 笔记详情页
│   └── list/       # 笔记列表页
└── project.config.json  # 项目配置文件
```