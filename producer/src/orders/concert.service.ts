import { Injectable, Inject } from '@nestjs/common';
import { ConcertDTO } from './concert.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ConcertsService {

    constructor(@Inject('CONCERTS_SERVICE') private rabbitClient: ClientProxy) {}

    placeConcert(order: ConcertDTO) {
        this.rabbitClient.emit("concert-placed", order);
        return { message: "concert created successfully!" };
    }
}
