# 项目规格书

## 项目愿景
构建 GitHub 上公开可用的个人工具生态：多个实用开源工具、精美前端、完整文档、自动化测试、GitHub Actions 部署、个人博客/工具导航站。

## 目标用户
- 开发者：需要常用开发工具
- 技术写作者：需要 Markdown 预览
- 系统管理员：需要 Cron 表达式生成
- 设计师：需要颜色调色板

## 工具清单 (5个)
1. JSON Formatter / Validator / Diff - 格式化、验证、比较 JSON
2. Markdown Previewer - 实时预览、代码高亮、导出
3. Cron Expression Helper - 可视化生成、未来执行时间
4. Color Palette Generator - 协调调色板、格式转换
5. Regex Tester - 实时匹配高亮、捕获组

## 非功能需求
- 首屏加载 < 2s，工具响应 < 100ms
- WCAG 2.1 AA 可访问性
- 深色/浅色模式
- 移动端响应式
- 纯前端处理，不上传数据

## 页面结构
/ (首页) - 个人介绍、工具卡片、技术栈、GitHub 链接
/tools (工具索引) - 搜索、分类、标签筛选
/tools/[name] (工具详情) - 工具界面、说明、示例
/blog (博客) - MDX 文章列表
/blog/[slug] (文章详情)

## 部署策略
- GitHub Pages 静态托管
- GitHub Actions CI/CD
- main 分支自动部署

## 验收标准
- [ ] 5 个工具全部可用
- [ ] 博客支持 MDX
- [ ] 响应式设计正常
- [ ] 深色/浅色模式正常
- [ ] Build 通过无错误
- [ ] 核心函数有测试
