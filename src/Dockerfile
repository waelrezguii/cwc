FROM node:18 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build --prod
FROM nginx:1.21
COPY --from=build /app/dist/club-world-cup25 /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]