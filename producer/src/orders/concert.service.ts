import { Injectable, OnModuleInit } from '@nestjs/common';
import { EventDTO } from './concert.dto';
import * as amqp from 'amqplib';

@Injectable()
export class ConcertsService implements OnModuleInit {

  // Estabilishes connection to rabbit, AMQP enables apps to connect to brokers.
  private connection: amqp.Connection;
  private channel: amqp.Channel;

  async onModuleInit() {
    await this.setupRabbitMQ();
  }

  // Initial config  
  private async setupRabbitMQ() {
    try {
      this.connection = await amqp.connect('amqp://localhost:5672');
      this.channel = await this.connection.createChannel();

      // Creating the exchange 'concert_headers_exchange' with type 'headers' then binding it to the queue 'rock_concerts_queue' with the header 'genre' set to 'rock'
      await this.channel.assertExchange('concert_headers_exchange', 'headers', { durable: true });
      await this.channel.assertQueue('rock_concerts_queue', { durable: false });
      await this.channel.bindQueue('rock_concerts_queue', 'concert_headers_exchange', '', {
        'x-match': 'all',
        'genre': 'rock',
      });

      await this.channel.assertExchange('culture_headers_exchange', 'headers', { durable: true });
      await this.channel.assertQueue('culture_queue', { durable: false });
      await this.channel.bindQueue('culture_queue', 'culture_headers_exchange', '', {
        'x-match': 'all',
        'genre': 'culture',
      });

      await this.channel.assertExchange('convention_headers_exchange', 'headers', { durable: true });
      await this.channel.assertQueue('convention_queue', { durable: false });
      await this.channel.bindQueue('convention_queue', 'convention_headers_exchange', '', {
        'x-match': 'all',
        'genre': 'convention',
      });

      await this.channel.assertExchange('sertanejo_concert_headers_exchange', 'headers', { durable: true });
      await this.channel.assertQueue('sertanejo_concert_queue', { durable: false });
      await this.channel.bindQueue('sertanejo_concert_queue', 'sertanejo_concert_headers_exchange', '', {
        'x-match': 'all',
        'genre': 'sertanejo',
      });

      await this.channel.assertExchange('pop_concert_headers_exchange', 'headers', { durable: true });
      await this.channel.assertQueue('pop_concert_queue', { durable: false });
      await this.channel.bindQueue('pop_concert_queue', 'pop_concert_headers_exchange', '', {
        'x-match': 'all',
        'genre': 'pop',
      });

      await this.channel.assertExchange('rap_concert_headers_exchange', 'headers', { durable: true });
      await this.channel.assertQueue('rap_concert_queue', { durable: false });
      await this.channel.bindQueue('rap_concert_queue', 'rap_concert_headers_exchange', '', {
        'x-match': 'all',
        'genre': 'rap',
      });

      await this.channel.assertExchange('conference_headers_exchange', 'headers', { durable: true });
      await this.channel.assertQueue('conference_queue', { durable: false });
      await this.channel.bindQueue('conference_queue', 'conference_headers_exchange', '', {
        'x-match': 'all',
        'genre': 'conference',
      });

      console.log('RabbitMQ configuration complete.');
    } catch (error) {
      console.error('Error configuring RabbitMQ:', error);
    }
  }

  async placeEvent(order: EventDTO, exchangeName: string, headers: { [key: string]: string }) {
    try {
      this.channel.publish(
        exchangeName,
        '',
        Buffer.from(JSON.stringify(order)),
        {
          headers, 
          persistent: true,
        },
      );
      console.log('message sent successfully.');
      return { message: 'Event created successfully!' };
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
