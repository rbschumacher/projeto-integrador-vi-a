import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async login(loginData: {
    cpf: string;
    password: string;
  }): Promise<Omit<User, 'password'>> {
    const { cpf, password } = loginData;
    const user = await this.prisma.user.findUnique({
      where: {
        cpf,
      },
    });

    if (user.password === password) {
      return {
        id: user.id,
        cpf: user.cpf,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
      };
    }

    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }
}
