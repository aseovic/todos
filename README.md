# To Do List for Dec 2016 Hackaton

To Do List is a simple task management application that allows users to add, complete, filter and 
delete tasks within a list.

The backend is implemented using Node.js and Express, and uses MongoDB instance hosted by Compose in the same GCE zone. 
The frontend is implemented using React and Redux, and uses Facebook Login to authenticate users. 

Basically, the goal was to demonstrate how to leverage external services available in the cloud in order 
to minimize the amount of work and the operational requirements for the application.

## Production application

Production version of the application is deployed as 4-node cluster on Google Container Service
and can be accessed at:

http://todos.seovic.net/

## Native iOS Client 

There is also a native iOS client for the application. See https://github.com/aseovic/todos-native for details.

## Building and running the application locally
 
After cloning the project you can build and run the application locally by executing following steps:

```
npm install
```
will install all the dependencies into the `node_modules` directory

```
npm run build
```
will compile React application into a single JavaScript bundle for production, and finally

```
npm start
```
will start the application server and allow you to access the application at http://localhost:3000/

## Building and running the application with Docker

You can also create a Docker image for the application by running
```
npm run docker:build
```

and then run the created Docker image using
```
npm run docker:run
```

The above will start the application inside of Docker and allow you to access it at http://localhost:8080/

## Docker Images

There is only one Docker images that the application depends on:
 
 1. https://hub.docker.com/r/aseovic/todos/
    An application image that is deployed to Google Cloud Container Service.
     
