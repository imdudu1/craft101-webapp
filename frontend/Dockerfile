FROM node:lts-alpine as builder

ENV NODE_ENV build

USER node
WORKDIR /home/node

COPY . /home/node

RUN npm install \
    && npm run build

# ---

FROM nginx

WORKDIR /app

RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d

COPY --from=builder /home/node/build/ /app/

CMD ["nginx", "-g", "daemon off;"]
