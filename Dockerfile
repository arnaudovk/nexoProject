FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY package.json .
RUN apk add --update python3 make g++\
    && rm -rf /var/cache/apk/*
RUN npm install
COPY . .
EXPOSE 3000
USER node
CMD ["node", "src/index.js"]
