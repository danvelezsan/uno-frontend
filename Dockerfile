FROM node:16-alpine
COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]