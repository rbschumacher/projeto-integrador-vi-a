import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return createUserDto;
  }

  findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} userasdasds`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} usersdasdasd ${JSON.stringify(
      updateUserDto,
    )}`;
  }

  remove(id: number) {
    return `This action removes a #${id} userasdasd`;
  }
}
