import { Controller } from '@nestjs/common';
import { ConcertsService } from './concert.service';
import { Post, Body } from '@nestjs/common';
import { ConcertDTO } from './concert.dto';

@Controller('orders')
export class ConcertsController {
  constructor(private readonly concertsService: ConcertsService) {

    
}
  @Post('place-concert')
    placeOrder(@Body() order: ConcertDTO) {
        return this.concertsService.placeConcert(order);

  }
}
