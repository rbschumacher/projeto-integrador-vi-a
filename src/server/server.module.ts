import { Module } from '@nestjs/common';

import { ViewModule } from 'src/server/view/view.module';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [ViewModule, UsersModule, OrdersModule, ItemsModule],
})
export class ServerModule {}
