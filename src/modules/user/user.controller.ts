import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';

import {
  ActiveUser,
  UserType,
} from 'src/shared/decorators/active-user.decorator';
import { AuthValidationInterceptor } from 'src/shared/interceptors/auth.interceptor';

@Controller('users')
@UseInterceptors(AuthValidationInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  me(@ActiveUser() userType: UserType) {
    return this.userService.getUserById(userType);
  }
}
