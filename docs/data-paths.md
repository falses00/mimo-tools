# 数据路径说明

## 本地开发
所有本地数据默认存储在项目内 `.data/` 目录:

```
.data/
├── cache/          # 缓存文件
├── sqlite/         # SQLite 数据库
├── indexes/        # 搜索索引
└── uploads/        # 上传文件
```

## 环境变量
- `MIMO_DATA_DIR`: 自定义数据目录路径 (默认: `.data`)

## 安全要求
- 不得写入 C 盘
- 不得写入用户主目录
- 不得写入 AppData
- `.data/` 已加入 `.gitignore`
- 不得提交数据库文件
