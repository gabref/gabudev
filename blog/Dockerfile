FROM node:22-alpine as build
RUN apk add --no-cache g++ make py3-pip libc6-compat

WORKDIR /app

COPY package*.json .
RUN npm install --force

COPY . .

RUN npm run build

FROM node:22-alpine as production

ENV NODE_ENV=production

WORKDIR /app
COPY --from=build /app/.next ./.next
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/public ./public
COPY --from=build /app/package.json ./package.json
EXPOSE 3000

CMD ["npm", "start"]
