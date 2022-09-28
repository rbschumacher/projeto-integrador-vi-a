import { Module } from '@nestjs/common';

import { AppModule } from 'src/server/app/app.module';
import { ViewModule } from 'src/server/view/view.module';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { KitchenModule } from './kitchen/kitchen.module';

@Module({
  imports: [AppModule, ViewModule, UsersModule, OrdersModule, KitchenModule],
})
export class ServerModule {}
