# Get node image from docker, latest image  
FROM node 

# Working Directory 
WORKDIR /app   

#First We get the packageJson to genearte the npminstall 
COPY package.json .

RUN npm install

#Asignt the WorkinDir and we pass the workdir to the App Directory from the docker
COPY . .

#We will use the port 80 from conteainter 
ARG DEFAULT_PORT=80

ENV PORT $DEFAULT_PORT

#We will assign from the -p The specicfic port from the user machine to the port exposed (-p <port from app> :<port from the machine> 
EXPOSE $PORT


# We start the npm start for runing the server.
CMD [ "npm", "start" ]

# Primero
# docker build -t node:test .
# Segundo
# docker run -d -p 3000:8080 --env PORT=8080 --rm --name node-app -v node:/app/node -v data:/app/data -v "C:\Proyectos\ChallangeNode:/app:ro" -v /app/data -v /app/node_modules  node:test