FROM node
RUN npm install ts-node && \
    npm install
COPY . /usr/src
WORKDIR /usr/src
EXPOSE 8000
CMD ["npm", "start"]