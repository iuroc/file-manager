FROM node
ADD . /usr/src
WORKDIR /usr/src
RUN npm config set registry https://registry.npm.taobao.org
RUN npm install ts-node -g
RUN npm install
EXPOSE 8000
CMD ["npm", "start"]