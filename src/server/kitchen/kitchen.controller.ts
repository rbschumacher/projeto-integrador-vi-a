import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { KitchenService } from './kitchen.service';
import { CreateKitchenDto } from './dto/create-kitchen.dto';
import { UpdateKitchenDto } from './dto/update-kitchen.dto';

@Controller('kitchen')
export class KitchenController {
  constructor(private readonly kitchenService: KitchenService) {}

  @Post()
  create(@Body() createKitchenDto: CreateKitchenDto) {
    return this.kitchenService.create(createKitchenDto);
  }

  @Get()
  findAll() {
    return this.kitchenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kitchenService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKitchenDto: UpdateKitchenDto) {
    return this.kitchenService.update(+id, updateKitchenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kitchenService.remove(+id);
  }
}
