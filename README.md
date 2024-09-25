This project is a RESTful API for managing various types of concerts and events. It utilizes RabbitMQ for message-based communication between different parts of the system, allowing the publishing and processing of event-related messages such as concert ticket orders.


# PREREQUISITES:
- npm (node)
- nest js
- docker
- rabbitmq
- postman or insomnia7
- jdk
- maven 


# GETTING STARTED - PRODUCER

1. Order docker to setup a rabbitmq container:

````bash
docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
````

2. Install nest js:

````bash
npm i -g @nestjs/cli
````

3. Run the producer using the command:

````bash
nest start --watch
````

4. Begin sending messages through the routes contained in orders/service through insomnia or postman, then access rabbit mq and type "guest" and "guest" for credentials.


# GETTING STARTED - CONSUMER 

1. Run the archive "ConsumerJavaApplication.java"

2. Type any of the number options in the menu

3. If you wish to choose more than one option, type separated by commas (ex: 1,2,3):
````bash
Choose the types of events you want to listen to (separated by commas):
1 - Rock
2 - Culture
3 - Convention
4 - Sertanejo
5 - Pop
6 - Rap
7 - Conference
````

4. Once selected the types of events you wish to listen to, the consumer application will start receiving messages from RabbitMQ based on your selections.
