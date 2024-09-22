import { Injectable } from '@nestjs/common';
import { OrderDTO } from './order.dto';

@Injectable()
export class AppService {
    handleOrderPlaced(order: OrderDTO) {
        console.log(`Order placed in email: ${order.email}`);
        return { message: "Order placed successfully" };
    }
}