FROM node:22.6.0

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

RUN chmod +x ./entrypoint.sh

EXPOSE 7000

ENTRYPOINT ["./entrypoint.sh"]
