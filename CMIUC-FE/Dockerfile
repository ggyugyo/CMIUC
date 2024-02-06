FROM node:20.11.0
WORKDIR /FE
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build
RUN npm install -g serve
EXPOSE 5173
ENTRYPOINT ["serve", "-l","5173","-s", "dist"]
