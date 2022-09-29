import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma.service';

@Injectable()
export class ItemsService {
  constructor(private prisma: PrismaService) {}

  listItems() {
    return this.prisma.item.findMany({
      select: { id: true, price: true, name: true },
    });
  }
}
