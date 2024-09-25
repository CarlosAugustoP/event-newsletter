This project is a RESTful API for managing various types of concerts and events. It utilizes RabbitMQ for message-based communication between different parts of the system, allowing the publishing and processing of event-related messages such as concert ticket orders.

# GETTING STARTED - PRODUCER
- Prerequisites:
- npm (node)
- nest js
- docker
- rabbitmq
- postman or insomnia7
- jdk
- maven 

first, order docker to setup a rabbitmq container

````bash
docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
````

then, install nest js:

````bash
npm i -g @nestjs/cli
````

Now run the producer using the command 

````bash
nest start --watch
````

And begin sending messages through the routes contained in orders/service through insomnia or postman, the acess rabbit mq and type guest guest for credentials

# GETTING STARTED - CONSUMER 

