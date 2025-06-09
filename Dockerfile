
FROM node:22-alpine AS builder


WORKDIR /usr/src/app


COPY package*.json ./


RUN npm install


COPY . .

RUN npm run build


FROM node:22-alpine


WORKDIR /usr/src/app


COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/tsconfig.json ./
COPY --from=builder /usr/src/app/nest-cli.json ./

COPY --from=builder /usr/src/app/node_modules ./node_modules

COPY --from=builder /usr/src/app/dist ./dist


EXPOSE 4000


CMD ["node", "dist/main"]