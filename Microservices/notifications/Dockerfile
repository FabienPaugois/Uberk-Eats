FROM node:16-alpine

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY . ./
RUN npm install

CMD ["npm", "start"]