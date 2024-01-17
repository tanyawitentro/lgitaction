# build stage
FROM node:20.10.0-alpine as build
WORKDIR /app
COPY package.json .
RUN npm i
COPY . .
RUN npm run build

# modules stage
FROM node:20.10.0-alpine as modules
WORKDIR /app
COPY package.json .
RUN npm i --production

# production stage
FROM node:20.10.0-alpine
ARG PM2_FILE
ARG HOST_PORT
ENV PM2_FILE ${PM2_FILE}
ENV HOST_PORT ${HOST_PORT}
RUN echo "pm2 environment is set to ${PM2_FILE}"
WORKDIR /app
COPY --from=build /app/dist/ ./dist/
COPY --from=modules /app/node_modules/ ./dist/node_modules
RUN apk add --no-cache tzdata && \
    cp /usr/share/zoneinfo/Asia/Bangkok /etc/localtime && \
    echo "Asia/Bangkok" > /etc/timezone
COPY ${PM2_FILE} .
RUN npm install -g pm2
# EXPOSE ${HOST_PORT}

# CMD ["pm2-runtime", "start", "${PM2_FILE}"]
CMD ["sh", "-c", "pm2-runtime start ${PM2_FILE}"]