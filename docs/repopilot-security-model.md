# RepoPilot 安全模型

## 安全原则

1. **用户确认优先**: 所有危险操作必须用户确认
2. **路径安全**: 禁止默认写 C 盘、用户目录
3. **脚本检测**: 自动检测危险脚本
4. **密钥保护**: 不读取用户密钥
5. **最小权限**: 只请求必要权限

## 危险命令检测

### package.json scripts
```
postinstall, preinstall, curl, wget, sudo, rm -rf, chmod, eval, base64, powershell
```

### Dockerfile
```
RUN curl | sh, RUN sudo, ADD/COPY 可疑文件
```

### GitHub Actions
```
使用不可信 action, 传递 secrets, 执行 shell 脚本
```

## 路径安全

### 禁止路径
- C:\
- 用户主目录
- AppData
- /etc
- /var
- /usr

### 允许路径
- 项目内目录
- 用户明确指定的安全目录
- 临时目录

## 用户确认流程

1. **选择目录**: 用户选择部署目录
2. **确认 clone**: 显示仓库信息，用户确认
3. **确认 install**: 显示安装命令，用户确认
4. **确认 start**: 显示启动命令，用户确认
5. **配置 API key**: 列出需要的环境变量

## 本地 Runner 安全

### 禁止操作
- 自动执行未知仓库 install
- 自动执行未知仓库 start
- 自动执行 curl | sh
- 自动执行 sudo
- 自动执行 rm -rf
- 默认写 C 盘
- 覆盖已有目录
- 读取用户 secret
- 把 token 写入前端

### 必须操作
- 路径安全检查
- 检测已有目录
- 危险脚本需要确认
- 用户取消时停止
- 输出配置清单
- 输出停止命令