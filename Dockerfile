FROM node:20-alpine

RUN apk add --no-cache openssl

WORKDIR /app

COPY package*.json ./
RUN npm install --frozen-lockfile

COPY . .

RUN npm run build

RUN npx prisma generate

EXPOSE 4000

CMD ["npm", "run", "start:dev"]
