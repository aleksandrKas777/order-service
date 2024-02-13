FROM node:18-slim


WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm cache clean --force
RUN npm ci

COPY . .

EXPOSE 3000

#CMD ["npm", "start"]
