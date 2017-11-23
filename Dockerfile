FROM node:8-alpine

RUN apk add --no-cache git
COPY . /exporter
WORKDIR /exporter
RUN npm install --production && npm cache clean --force

EXPOSE 9091

CMD ["npm", "start", "/openweathermap.yml", "-p", "9091"]
