import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  login(@Body() loginData: { cpf: string; password: string }) {
    return this.usersService.login(loginData);
  }
}
