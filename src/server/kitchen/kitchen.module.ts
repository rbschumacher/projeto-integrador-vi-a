import { Module } from '@nestjs/common';
import { KitchenService } from './kitchen.service';
import { KitchenController } from './kitchen.controller';

@Module({
  controllers: [KitchenController],
  providers: [KitchenService]
})
export class KitchenModule {}
