FROM node:18.10-alpine as base
WORKDIR /app
COPY package*.json ./
RUN npm install



FROM base as development
CMD ["npm", "start"]


FROM base as build
COPY . .
RUN npm run build


FROM nginx:alpine as production
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

