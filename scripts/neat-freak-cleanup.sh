#!/bin/bash
# Neat Freak Cleanup Script

echo "🧹 Starting Neat Freak cleanup..."

# 1. 移除空行
echo "1. Removing empty lines..."
find apps/ -name "*.ts" -o -name "*.astro" | xargs sed -i '/^$/d' 2>/dev/null

# 2. 移除尾部空格
echo "2. Removing trailing whitespace..."
find apps/ -name "*.ts" -o -name "*.astro" | xargs sed -i 's/[[:space:]]*$//' 2>/dev/null

# 3. 移除未使用的 console.log（保留 error 和 warn）
echo "3. Cleaning console.log..."
find apps/ -name "*.ts" -o -name "*.astro" | xargs grep -l "console.log" 2>/dev/null | while read file; do
  # 保留 error 和 warn
  sed -i '/console\.log/d' "$file" 2>/dev/null
done

echo "✅ Neat Freak cleanup complete!"
