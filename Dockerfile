FROM node:18-alpine AS build

WORKDIR /app

COPY ./app/package*.json ./

RUN npm install

COPY ./app/ ./

RUN npm run build

# Production container

FROM node:18-alpine AS production

WORKDIR /app

COPY --from=build /app ./

RUN npm ci --only=production

EXPOSE 3000

CMD ["npm", "start"]