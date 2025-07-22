FROM node:18.13.0 AS client_web

WORKDIR /app

COPY AREA-WEB/ /app

RUN yarn install

EXPOSE 8081

CMD ["yarn", "start"]
