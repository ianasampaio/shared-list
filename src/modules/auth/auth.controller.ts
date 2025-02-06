import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  ActiveUser,
  UserType,
} from 'src/shared/decorators/active-user.decorator';
import { AuthService } from './auth.service';
import {
  ForgotPasswordDto,
  ForgotPasswordResponseDto,
} from './dto/forgot-password.dto';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { ForgotPasswordValidationInterceptor } from './interceptors/forgot-password.interceptor';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @ApiOperation({ summary: 'Signup an user' })
  signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  @Post('/signin')
  @ApiOperation({ summary: 'Signin an user' })
  signin(@Body() signinDto: SigninDto) {
    return this.authService.signin(signinDto);
  }

  @Post('/forgot-password')
  @ApiOperation({ summary: 'Reset an user password' })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ type: ForgotPasswordResponseDto })
  forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @Post('/update-password')
  @ApiOperation({ summary: 'Update the user password' })
  @UseInterceptors(ForgotPasswordValidationInterceptor)
  updatePassword(
    @Body() updatePassword: UpdatePasswordDto,
    @ActiveUser() user: UserType,
  ) {
    return this.authService.updatePassword(user, updatePassword);
  }
}
