import { Injectable } from '@nestjs/common';
import { Order } from '@prisma/client';

import { PrismaService } from '../prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async newOrder(orderDto: { items: number[] }) {
    const orderItems = await this.prisma.item.findMany({
      where: {
        id: { in: orderDto.items },
      },
    });

    const orderPrice = orderItems.reduce((acc, item) => acc + item.price, 0);

    return this.prisma.order.create({
      data: {
        items: {
          connect: orderItems.map((orderItem) => ({ id: orderItem.id })),
        },
        price: orderPrice,
        status: 'WAITING_PAYMENT',
      },
    });
  }

  async listOrders(filter: Pick<Order, 'status'>) {
    return this.prisma.order.findMany({
      where: {
        status: filter.status,
      },
    });
  }

  async payOrder(id: string) {
    return this.prisma.order.update({
      where: {
        id: Number(id),
      },
      data: {
        status: 'PREPARING',
      },
    });
  }

  async finishOrder(id: string) {
    return this.prisma.order.update({
      where: {
        id: Number(id),
      },
      data: {
        status: 'FINISHED',
      },
    });
  }
}
