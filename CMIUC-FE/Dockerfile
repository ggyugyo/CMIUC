FROM node:20.11.0
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build || exit 1
RUN npm install -g serve
EXPOSE 5173
ENTRYPOINT ["serve", "-l","5173","-s", "dist"]
