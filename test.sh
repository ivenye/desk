#!/bin/bash

echo "🧪 Desk 项目快速测试脚本"
echo "================================"
echo ""

# 颜色定义
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 检查 Node.js
echo "1️⃣ 检查 Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}✅ Node.js 已安装: $NODE_VERSION${NC}"
else
    echo -e "${RED}❌ Node.js 未安装${NC}"
    exit 1
fi

# 检查 npm
echo ""
echo "2️⃣ 检查 npm..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo -e "${GREEN}✅ npm 已安装: $NPM_VERSION${NC}"
else
    echo -e "${RED}❌ npm 未安装${NC}"
    exit 1
fi

# 检查项目目录
echo ""
echo "3️⃣ 检查项目目录..."
if [ -f "package.json" ]; then
    echo -e "${GREEN}✅ 项目目录正确${NC}"
else
    echo -e "${RED}❌ 请在项目根目录运行此脚本${NC}"
    exit 1
fi

# 检查依赖
echo ""
echo "4️⃣ 检查关键依赖..."
MISSING_DEPS=0

if npm list zod &> /dev/null; then
    echo -e "${GREEN}✅ zod 已安装${NC}"
else
    echo -e "${YELLOW}⚠️  zod 未安装${NC}"
    MISSING_DEPS=1
fi

if npm list eventemitter3 &> /dev/null; then
    echo -e "${GREEN}✅ eventemitter3 已安装${NC}"
else
    echo -e "${YELLOW}⚠️  eventemitter3 未安装${NC}"
    MISSING_DEPS=1
fi

if [ $MISSING_DEPS -eq 1 ]; then
    echo ""
    echo -e "${YELLOW}📦 需要安装缺失的依赖${NC}"
    echo "运行: npm install zod eventemitter3"
    echo ""
    read -p "是否现在安装？(y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        npm install zod eventemitter3
    fi
fi

# TypeScript 编译检查
echo ""
echo "5️⃣ TypeScript 编译检查..."
if npx tsc --noEmit; then
    echo -e "${GREEN}✅ TypeScript 编译通过${NC}"
else
    echo -e "${RED}❌ TypeScript 编译失败${NC}"
    echo "请检查类型错误"
fi

# 检查关键文件
echo ""
echo "6️⃣ 检查关键文件..."
FILES=(
    "src/plugin-sdk/index.ts"
    "src/commands/index.ts"
    "src/store/rootStore.ts"
    "src/config/manager.ts"
    "src/ui/index.ts"
)

for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✅ $file${NC}"
    else
        echo -e "${RED}❌ $file 不存在${NC}"
    fi
done

# 总结
echo ""
echo "================================"
echo "🎯 测试检查完成！"
echo ""
echo "📝 下一步："
echo "1. 如果所有检查都通过，运行: npm run dev"
echo "2. 在浏览器中打开 http://localhost:5173"
echo "3. 按照 完整测试指南.md 进行功能测试"
echo ""
echo "🐛 如果遇到问题："
echo "- 查看 Console 中的错误信息"
echo "- 参考 完整测试指南.md 中的常见问题排查"
echo ""
echo "✨ 祝测试顺利！"
