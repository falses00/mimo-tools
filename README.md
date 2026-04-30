# MIMO - 个人工具生态

一个开源、免费、无广告的开发者工具集合，包含实用工具、技术博客和个人导航站。

## 特性

- **实用工具** - JSON格式化、Markdown预览、Cron生成器等
- **技术博客** - 分享开发经验和技巧
- **精美设计** - 现代UI，支持深色/浅色模式
- **响应式** - 完美适配桌面和移动设备
- **高性能** - 基于Astro静态生成，加载速度快
- **隐私安全** - 所有工具纯前端处理，不上传数据

## 快速开始

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建生产版本
npm run build

# 运行测试
npm test
```

## 项目结构

```
mimo/
├── apps/
│   ├── blog/          # Astro博客/门户站点
│   └── tools/         # 工具应用
├── packages/
│   └── ui/            # 共享UI组件库
├── docs/              # 项目文档
└── .github/           # GitHub配置
```

## 可用工具

### 开发者工具
1. **JSON Formatter** - JSON格式化、验证、差异比较
2. **Regex Tester** - 正则表达式测试
3. **Cron Helper** - Cron表达式可视化生成
4. **URL Encoder/Decoder** - URL编码/解码，Query string解析
5. **Base64 Encoder/Decoder** - Base64编码/解码，支持UTF-8
6. **UUID Generator** - 生成v4 UUID，批量生成

### 写作工具
7. **Markdown Previewer** - Markdown实时预览
8. **Text Utilities** - 大小写转换、去空行、统计字符/单词/行数

### 设计工具
9. **Color Palette** - 颜色调色板生成

### 日期时间
10. **Timestamp Converter** - Unix timestamp与日期互转

## 文档

- [项目规格书](PROJECT_SPEC.md)
- [架构设计](ARCHITECTURE.md)
- [任务清单](TASKS.md)
- [贡献指南](CONTRIBUTING.md)
- [安全政策](SECURITY.md)

## 许可证

本项目采用 [MIT 许可证](LICENSE)。
