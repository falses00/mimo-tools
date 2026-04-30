# zixungou.com 设计参考分析

## 参考站视觉特征

### 1. 导航栏
- 固定顶部，半透明背景 (`bg-black/40 backdrop-blur-2xl`)
- 圆角胶囊形状 (`rounded-full`)
- 细边框 (`border border-white/5`)
- 发光阴影 (`shadow-[0_0_30px_rgba(238,239,238,0.05)]`)
- Logo + 导航链接 + CTA 按钮
- 移动端：底部导航栏

### 2. Hero 区域
- 双栏布局（文字 + 视觉元素）
- 大号粗体标题
- 渐变文字效果 (`bg-clip-text text-transparent`)
- 功能要点带勾选图标
- 主次 CTA 按钮
- 右侧：终端/代码预览，带透视效果

### 3. 视觉效果
- 噪点叠加层
- 网格背景
- 彩色模糊光球（橙色、紫色）
- 极光容器
- 边框发光效果
- 卡片悬停径向渐变

### 4. 卡片设计
- 大圆角 (`rounded-[2rem]`)
- 细边框 (`border-white/10`)
- 玻璃质感 (`backdrop-blur-sm`)
- 悬停上浮效果
- 状态标签
- 箭头图标

### 5. 色彩方案
- 深色背景（黑色/zinc-900）
- 白色文字，不同透明度
- 强调色（橙色、紫色、蓝色）
- 细微边框和发光

## 可借鉴点

1. **导航栏**: 半透明胶囊形，带发光效果
2. **Hero**: 双栏布局，左侧文字右侧视觉
3. **卡片**: 大圆角、玻璃质感、悬停效果
4. **背景**: 噪点、网格、彩色光球
5. **动效**: 悬停上浮、渐变文字、发光边框
6. **排版**: 大号标题、层次分明、留白充足

## 不可复制内容

1. Logo 和品牌标识
2. 文案内容
3. 图片素材
4. 源码结构
5. 具体颜色值（需转换为 MIMO 暗金风格）

## MIMO 设计策略

### 保留 MIMO 特色
- 暗金主色 (#d4af37)
- 深灰背景 (#0b0d12)
- Three.js 3D Hero
- 工程工具生态定位
- API Mode / Static Demo Mode

### 借鉴 zixungou.com 的改进
1. 导航栏改为半透明胶囊形
2. Hero 改为双栏布局
3. 卡片增加大圆角和玻璃质感
4. 背景增加噪点和网格
5. 增加悬停发光效果
6. 优化排版层次

### MIMO 最终设计关键词
- Premium SaaS
- 3D Dark Gold
- Glass Morphism
- Floating Cards
- Dynamic Grid
- Gold Glow
- Engineering Cockpit
- Product Landing Page