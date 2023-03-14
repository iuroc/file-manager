FROM node
RUN npm install npm@9.6.1 -g && \
    npm install ts-node -g && \
    npm install
COPY . /usr/src
WORKDIR /usr/src
EXPOSE 8000
CMD ["npm", "start"]