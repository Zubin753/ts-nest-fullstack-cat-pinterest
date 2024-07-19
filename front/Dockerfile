FROM node as vite-app

WORKDIR /app/client
COPY . .

RUN npm ci
RUN npm run build

FROM nginx:alpine

WORKDIR /usr/share/nginx/

RUN rm -rf html && mkdir html

WORKDIR /

COPY ./nginx.conf /etc/nginx
COPY --from=vite-app ./app/client/dist /usr/share/nginx/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]
