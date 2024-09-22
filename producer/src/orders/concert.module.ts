import { Module } from '@nestjs/common';
import { ConcertsService } from './concert.service';
import { ConcertsController } from './concert.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
@Module({
  imports : [
    ClientsModule.register([
      {
        name: 'CONCERTS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'concerts_queue',
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
