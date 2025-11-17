# 访客位置追踪系统

本文档介绍了如何在 BlogRoll 项目中实现访客位置追踪功能。

## 功能概述

访客位置追踪系统可以：
1. 记录访问您网站的用户位置
2. 在地图上可视化显示所有访问者的位置
3. 提供实时更新的访客位置视图

## 技术架构

该系统基于以下技术构建：
- Cloudflare Workers - 处理访客位置数据
- Cloudflare Workers KV - 存储访客位置数据
- 高德地图 API - 显示访客位置
- Vue.js 组件 - 前端集成

## 实现细节

### 1. Worker 实现

访客位置追踪功能由单独的 Worker 处理：

1. 当访客访问网站时，系统会向 `/api/visitors` 发送 POST 请求
2. Worker 从请求中提取访客的 IP 地址和地理位置信息
3. 这些信息被存储在 Workers KV 中

### 2. 数据结构

访客数据以以下格式存储：

```json
{
  "ip": "访客IP地址",
  "location": {
    "country": "国家",
    "region": "地区",
    "city": "城市",
    "latitude": "纬度",
    "longitude": "经度"
  },
  "timestamp": "记录时间"
}
```

### 3. 前端集成

[CustomMapMarker.vue](file:///E:/TESTrange8/BlogRoll/web/src/components/CustomMapMarker.vue) 组件已被修改以支持访客位置显示：

1. 添加了 `enableVisitorTracking` 属性来控制是否启用访客追踪
2. 实现了 `trackVisitor()` 方法来记录当前访客
3. 实现了 `loadVisitorMarkers()` 方法来加载并显示所有访客位置

### 4. 配置

需要在 Cloudflare 控制台中：

1. 创建一个 Workers KV 命名空间
2. 在 [wrangler.toml](file://e:\TESTrange8\BlogRoll\wrangler.toml) 中配置命名空间绑定：

```toml
[[kv_namespaces]]
binding = "VISITOR_DATA"
id = "your_kv_namespace_id"
```

## 部署

1. 部署访客追踪 Worker
2. 配置路由指向该 Worker 的 `/api/visitors` 端点
3. 确保前端可以访问这些 API 端点

## 注意事项

1. 访客隐私：系统仅记录 IP 地址和大致地理位置，不记录个人身份信息
2. 数据保留：建议定期清理旧的访客数据以节省存储空间
3. 性能考虑：访客标记每30秒更新一次，可根据需要调整频率