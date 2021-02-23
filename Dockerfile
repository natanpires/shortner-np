FROM node:lts

RUN mkdir -p /app

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 8081

CMD [ "npm", "run", "start" ]