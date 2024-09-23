import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConcertDTO } from './concert.dto';
import * as amqp from 'amqplib';

@Injectable()
export class ConcertsService implements OnModuleInit {
  private readonly exchangeName = 'concerts_headers_exchange';
  private readonly queueName = 'concerts_queue';

  private connection: amqp.Connection;
  private channel: amqp.Channel;

  async onModuleInit() {
    await this.setupRabbitMQ();
  }

  private async setupRabbitMQ() {
    try {
      this.connection = await amqp.connect('amqp://localhost:5672');
      this.channel = await this.connection.createChannel();

      await this.channel.assertExchange(this.exchangeName, 'headers', { durable: true });

      await this.channel.assertQueue(this.queueName, { durable: false });
      await this.channel.bindQueue(this.queueName, this.exchangeName, '', {
        'x-match': 'all',
        'genre': 'rock',
        'location': 'stadium',
      });

      console.log('RabbitMQ configuration complete.');
    } catch (error) {
      console.error('Error configuring RabbitMQ:', error);
    }
  }

  async placeConcert(order: ConcertDTO) {
    try {
      this.channel.publish(
        this.exchangeName,
        '',
        Buffer.from(JSON.stringify(order)),
        {
          headers: { genre: 'rock', location: 'stadium' }, 
          persistent: true,
        },
      );
      console.log('Concert message sent successfully.');
      return { message: 'concert created successfully!' };
    } catch (error) {
      console.error('Error sending message to RabbitMQ:', error);
      throw error;
    }
  }

  async onModuleDestroy() {
    if (this.channel) {
      await this.channel.close();
    }
    if (this.connection) {
      await this.connection.close();
    }
  }
}
