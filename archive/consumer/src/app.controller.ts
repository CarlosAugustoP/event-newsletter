import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ConcertDTO } from './concert.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('concert-placed')
  handleConcertPlaced(@Payload() concert: ConcertDTO) {
    return this.appService.handleConcertPlaced(concert);
  }
}
