# Image Resizer Service for Dec 2016 Hackaton

Image Resizer is a simple web application that allows users to upload an image from a local 
file system and resize it to the boundaries specified by the maximum width and/or height.

The backend is implemented using Node.js and Express, and it uses ImageMagick library for the
actual image manipulation. The frontend is implemented using React.

## Production application

Production version of the application is deployed as 4-node cluster on Google Container Service
and can be accessed at:

http://resizer.seovic.net/

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

Note that ImageMagic must be installed on your local machine in order for the application to work.
On Mac OS X, this is easily accomplished by running
```
brew install ImageMagic
```

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

Note that in this case you don't need to have ImageMagick installed locally, as it is already baked
into the Docker image.

## Docker Images

There are two Docker images that the application depends on:
 
 1. https://hub.docker.com/r/aseovic/node-imagemagick/
    A base Docker image containing Node 6.9.2 and ImageMagick 6.9.1
    
 2. https://hub.docker.com/r/aseovic/image-resizer/
    An application image that is deployed to Google Cloud Container Service, which extends the base 
    image above
     
