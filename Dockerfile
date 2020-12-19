
FROM node:15.1.0-alpine3.10
WORKDIR /usr/src/app
COPY package.json .
RUN npm install
COPY . .
RUN sh -c 'yarn global add serve && yarn && yarn build'
CMD serve -l $PORT -s build