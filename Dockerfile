FROM node
RUN npm install ts-node && \
    npm install && \
    npm run start
COPY . /usr/src
WORKDIR /usr/src
EXPOSE 8000