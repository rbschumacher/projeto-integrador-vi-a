import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Order } from '@prisma/client';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async newOrder(@Body() orderDto: { items: number[] }) {
    return this.ordersService.newOrder(orderDto);
  }

  @Get()
  listOrders(@Query() params: Pick<Order, 'status'>) {
    return this.ordersService.listOrders(params);
  }

  @Post('pay/:id')
  payOrder(@Param('id') id: string) {
    return this.ordersService.payOrder(id);
  }

  @Post('finish/:id')
  finishOrder(@Param('id') id: string) {
    return this.ordersService.finishOrder(id);
  }
}
