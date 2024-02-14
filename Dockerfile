FROM node:lts
WORKDIR /app
COPY . .

RUN npm install -g prisma
RUN npm install
RUN npx prisma generate
RUN npx prisma migrate

CMD ["node", "src/server.js"]
