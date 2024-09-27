import { Controller } from '@nestjs/common';
import { ConcertsService } from './concert.service';
import { Post, Body } from '@nestjs/common';
import { EventDTO } from './concert.dto';
@Controller('orders')
export class ConcertsController {
  constructor(private readonly concertsService: ConcertsService) {
    
}
  @Post('place-rock')
    placeConcert(@Body() order: EventDTO) {
        return this.concertsService.placeEvent(order , 'concert_headers_exchange', { genre: 'rock' });

  }

  @Post('place-culture')
    placeCulture(@Body() order: EventDTO) {
        return this.concertsService.placeEvent(order , 'culture_headers_exchange', { genre: 'culture' });

  }

  @Post('place-convention')
    placeConvention(@Body() order: EventDTO) {
        return this.concertsService.placeEvent(order , 'convention_headers_exchange', { genre: 'convention' });

  }

  @Post('place-sertanejo')
    placeSertanejo(@Body() order: EventDTO) {
        return this.concertsService.placeEvent(order , 'sertanejo_concert_headers_exchange', { genre: 'sertanejo' });

  }

  @Post('place-pop')
    placePop(@Body() order: EventDTO) {
        return this.concertsService.placeEvent(order , 'pop_concert_headers_exchange', { genre: 'pop' });

  }

  @Post('place-rap')
    placeRap(@Body() order: EventDTO) {
        return this.concertsService.placeEvent(order , 'rap_concert_headers_exchange', { genre: 'rap' });

  }

  @Post('place-conference')
    place(@Body() order: EventDTO) {
        return this.concertsService.placeEvent(order , 'conference_headers_exchange', { genre: 'conference' });

  }

}
