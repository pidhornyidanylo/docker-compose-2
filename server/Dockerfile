FROM node:20.12.1

RUN npm install -g nodemon

WORKDIR /app

COPY . . 

RUN npm install

EXPOSE 4000

CMD [ "npm", "run", "start:dev" ]