# 使用官方 Node.js 运行时作为基础镜像
FROM node:22-alpine

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# 安装项目依赖
RUN npm install -g pnpm && pnpm install

# 复制项目文件
COPY . .

# 暴露端口
EXPOSE 7000
