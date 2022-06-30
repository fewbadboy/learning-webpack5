FROM node:14
COPY ./ /app
WORKDIR /app
RUN npm install && npm run build

FROM nginx
RUN mkdir -p /app/webpack
COPY --from=0 /app/webpack /app/webpack
COPY nginx.conf /etc/nginx/nginx.conf