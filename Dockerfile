FROM node:18.18.0 as build

ARG environment=docker
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm install -g @angular/cli@16.2.1
RUN ng build --configuration $environment

FROM nginx:1.17-alpine

#COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/dog-frontend /usr/share/nginx/html

