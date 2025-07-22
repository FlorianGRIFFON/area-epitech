FROM node:18.13.0 AS server

WORKDIR /app

COPY AREA-API/ /app

RUN yarn install

EXPOSE 8080

CMD ["yarn", "start"]
