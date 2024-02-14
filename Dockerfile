FROM node:lts
WORKDIR /app

COPY . .
RUN npm install
RUN npx prisma generate
EXPOSE 3000
CMD ["node", "src/server.js"]
