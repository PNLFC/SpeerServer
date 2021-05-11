#Use an existing docker image as a base
FROM node:10

#change working directory in container
WORKDIR '/app'

#copy package.json to container
COPY ./package.json ./

#download dependencies
RUN npm install

#copy all other files
COPY . .

EXPOSE 5000

#BUILD 
CMD ["npm", "run", "start"]