import { Controller } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Post, Body } from '@nestjs/common';
import { OrderDTO } from './order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {

    
}
  @Post('place-order')
    placeOrder(@Body() order: OrderDTO) {
        return this.ordersService.placeOrder(order);

  }
}
