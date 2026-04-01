# 第一阶段：编译 (build)
FROM docker.io/library/node:20-alpine as build
LABEL authors="xgao"

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 第二阶段：运行 (runtime) - 补上这一段 🚀
FROM docker.io/library/nginx:stable-alpine
# 将第一阶段生成的 dist 文件夹拷贝到 nginx 的默认静态目录
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]