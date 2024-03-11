
FROM node:18.10-alpine as base
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

FROM base as development
CMD ["npm", "start"]

FROM base as production
RUN npm run build
RUN npm install -g serve
CMD ["npx", "serve", "-s", "build"]
