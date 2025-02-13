import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { UserRepository } from 'src/infra/database/prisma/repositories/user/user.repository';
import { Templates, TokenAction } from 'src/infra/mail/mail.dto';
import { MailService } from 'src/infra/mail/mail.service';
import { UserType } from 'src/shared/decorators/active-user.decorator';
import { env } from 'src/shared/env';
import { UUIDGenerator } from 'src/shared/uuid-generator';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  public async signup(signupDto: SignupDto) {
    const email = signupDto.email;

    const userWithEmail = await this.userRepository.findByEmail(email);

    if (userWithEmail) {
      throw new ConflictException(`user with email ${email} already exists`);
    }

    const hashedPassword = await hash(signupDto.password, 10);

    const now = new Date();

    await this.userRepository.create({
      id: UUIDGenerator.generate(),
      name: signupDto.name,
      email: signupDto.email,
      password: hashedPassword,
      createdAt: now,
      updatedAt: now,
    });
  }

  public async signin(signinDto: SigninDto) {
    const email = signinDto.email;

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException(`user with email ${email} not found`);
    }

    const passwordMatch = await compare(signinDto.password, user.password);

    if (!passwordMatch) {
      throw new BadRequestException('credentials do not match');
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      token,
    };
  }

  public async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const email = forgotPasswordDto.email;

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException(`user with email ${email} not found`);
    }

    const payload = {
      user: {
        id: user.id,
      },
      action: TokenAction.FORGOT_PASSWORD,
    };

    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '24h',
    });

    const frontendForgotPasswordUrl = `${env.frontendUrl}?token=${token}`;

    await this.mailService.send({
      to: user.email,
      subject: 'test email',
      template: Templates.FORGOT_PASSWORD,
      payload: {
        link: frontendForgotPasswordUrl,
      },
    });

    return {
      sentTo: user.email,
    };
  }

  public async updatePassword(
    userType: UserType,
    updatePasswordDto: UpdatePasswordDto,
  ) {
    const user = await this.userRepository.findById(userType.id);

    if (!user) {
      throw new NotFoundException(`user not found`);
    }

    const newPasswordHashed = await hash(updatePasswordDto.newPassword, 10);

    await this.userRepository.update({
      ...user,
      password: newPasswordHashed,
    });
  }
}
