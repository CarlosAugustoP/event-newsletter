import { Module } from '@nestjs/common';
import { ConcertsService } from './concert.service';
import { ConcertsController } from './concert.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ROCK_CONCERTS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'rock_concerts_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
      {
        name: 'POP_CONCERTS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'pop_concerts_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
      {
        name: 'RAP_CONCERTS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'rap_concerts_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
      {
        name: 'CULTURE_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'culture_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
      {
        name: 'CONVENTION_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'convention_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
      {
        name: 'SERTANEJO_CONCERTS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'sertanejo_concerts_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
      {
        name: 'CONFERENCE_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'conference_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [ConcertsController],
  providers: [ConcertsService],
})
export class OrdersModule {}
