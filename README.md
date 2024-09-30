# Event Newsletter

This project is part of the course `Fundamentals of Concurrent, Parallel, and Distributed Computing` at [Cesar School](https://cesar.school). It demonstrates a message-based communication system using RabbitMQ with three main components:

- Message Producer (Node.js/NestJS)
- Message Consumer (Java)
- Audit Backend (Python)

The system simulates event management, where producers send concert-related data, consumers process the messages, and the audit backend monitors all messages. RabbitMQ enables communication between components via a message exchange model.

[video](https://youtu.be/asO_-25EUW8)

 [![https://youtu.be/asO_-25EUW8](https://img.youtube.com/vi/asO_-25EUW8/0.jpg)](https://youtu.be/asO_-25EUW8)
## Tools
- [RabbitMQ](https://www.rabbitmq.com/)
- [Docker](https://www.docker.com/) (optional, for running RabbitMQ)
- [Insomnia](https://insomnia.rest/) or [Postman](https://www.postman.com/)] for API testing
- [Node.js](https://nodejs.org/) with npm
- [NestJS](https://nestjs.com/)
- [Java](https://www.java.com/)
- [Python](https://www.python.org/)


## Getting Started

### Prerequisites
Ensure the following tools are installed:
- RabbitMQ (via Docker or locally)  
- Node.js and npm  
- Java Development Kit (JDK) and Maven  
- Python with virtualenv  

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
```

### Insomnia
Go to the [official website](https://insomnia.rest/) and download the application.  
Alternatively, you can use [Postman](https://www.postman.com/).

### Setting Up the Producer (Node.js and NestJS)

- Install Node.js and NestJS:

````bash
sudo apt install nodejs npm
npm install -g @nestjs/cli
````

- Install dependencies on the `producer` directory:
```bash
cd producer
npm install
```

### Setting Up the Consumer (Java and Maven)

```bash
sudo apt-get install default-jdk
sudo apt-get install maven
```
- Install dependencies on the `consumer` directory:

```bash
cd consumer
mvn clean install
```

### Setting Up the Audit Backend (Python)

```bash
cd audit
python3 -m venv venv
source venv/bin/activate
```
```bash
pip install -r requirements.txt
```

## Running the Application

1. Run **RabbitMQ**

```bash
sudo systemctl start rabbitmq-server
```
```
http://localhost:15672 
```

User and password: `guest` 

2. Run the **Audit Backend**

```bash
python3 src/audit.py
```

3. Run the **Producer**

```bash
nest start --watch
```
In Imsomnia, send a POST request to `http://localhost:{port}/orders/place-{eventType}` 

The **{port}** can be set on `.env `file for each producer instance.

The **{eventType}** can be `rock`, `culture`, `convention`, `sertanejo`, `pop`, `rap` or `conference`.

For example:

`http://localhost:3000/orders/place-rock`

and the following JSON body:

```json
{
    "name": "Sample Event",
    "quantity": 100,
    "description": "Event Description",
    "price": 50,
    "date": "2024-10-30"
}
```

1. Run the **Consumer**

Run the application:
```bash
mvn spring-boot:run
```



## Team

Carlos Augusto  
Gabriel Rossiter  
Matheus Gomes  
Pedro Coelho  
