FROM node
ADD . /usr/src
WORKDIR /usr/src
RUN npm config set registry https://registry.npm.taobao.org && \
    npm install ts-node -g && \
    npm install
EXPOSE 8000
CMD ["npm", "start"]