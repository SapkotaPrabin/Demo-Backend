FROM node:24-alpine AS build

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

FROM node:24-alpine AS runtime

ENV NODE_ENV=production
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production && yarn cache clean

COPY --from=build /app/dist ./dist
COPY --from=build /app/scripts ./scripts

EXPOSE 3000

CMD ["sh", "-c", "node ./node_modules/typeorm/cli.js migration:run -d dist/src/frameworks/datasource.js && node dist/src/main.js"]
