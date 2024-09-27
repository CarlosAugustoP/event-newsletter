# Event Ne

This project is a RESTful API for managing various types of concerts and events. It utilizes RabbitMQ for message-based communication between different parts of the system, allowing the publishing and processing of event-related messages such as concert ticket orders.


## Tools
[RabbitMQ]
[Node.js] with npm
[NestJS]
[Docker] (optional, for running RabbitMQ)
[Postman] or [Insomnia] for API testing
[Java Development Kit (JDK)]
[Maven]


## Getting Started

### RabbitMQ
Run RabbitMQ as a docker container or install it on your machine:

- Docker
```bash
docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
````

- Ubuntu

```bash
sudo apt install erlang
sudo apt install rabbitmq-server
sudo systemctl enable rabbitmq-server
sudo systemctl start rabbitmq-server
```

- Dashboard:

URL: `http://localhost:15672`  
User: `guest`  
Password: `guest`



### Node.js and NestJS

- Install Node.js and NestJS:

````bash
sudo apt install nodejs npm
npm install -g @nestjs/cli
````

- Install dependencies:
```bash
cd producer
npm install
```

Run the application:
```bash
nest start --watch
````
or
```bash
npm run start
```

### Java and Maven
```bash
sudo apt-get install default-jdk
sudo apt-get install maven
```

```bash
cd consumer
mvn clean install
```
Run the application:
```bash
mvn spring-boot:run
```
### Insomnia
Go to the [official website](https://insomnia.rest/) and download the application.

# Running the App

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
