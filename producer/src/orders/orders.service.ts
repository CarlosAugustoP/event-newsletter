import { Injectable, Inject } from '@nestjs/common';
import { OrderDTO } from './order.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class OrdersService {

    constructor(@Inject('ORDERS_SERVICE') private rabbitClient: ClientProxy) {}

    placeOrder(order: OrderDTO) {
        this.rabbitClient.emit("order-placed", order);
        return { message: "Order placed successfully" };
    }
}
