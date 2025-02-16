import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CollaboratorRepository } from 'src/infra/database/prisma/repositories/collaborator/collaborator.repository';
import { UserRepository } from 'src/infra/database/prisma/repositories/user/user.repository';
import { Templates, TokenAction } from 'src/infra/mail/mail.dto';
import { MailService } from 'src/infra/mail/mail.service';
import { env } from 'src/shared/env';
import { InviteCollaboratorDto } from './dto/invite-collaborator.dto';
import { UserType } from 'src/shared/decorators/active-user.decorator';
import { UUIDGenerator } from 'src/shared/uuid-generator';

@Injectable()
export class CollaboratorService {
  constructor(
    private readonly collaboratorRepository: CollaboratorRepository,
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  public async sendInvitation(inviteCollaboratorDto: InviteCollaboratorDto) {
    const email = inviteCollaboratorDto.email;

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException(`Solicitação de convite inválida`);
    }

    const payload = {
      user: {
        id: user.id,
      },
      shoppingListId: inviteCollaboratorDto.shoppingListId,
      action: TokenAction.INVITE_COLLABORATOR,
    };

    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '24h',
    });

    const frontendInviteCollaboratorUrl = `${env.frontendUrl}?token=${token}`;

    await this.mailService.send({
      to: user.email,
      subject: 'test email for collaborator invitation',
      template: Templates.INVITE_COLLABORATOR,
      payload: {
        link: frontendInviteCollaboratorUrl,
      },
    });

    return {
      sentTo: user.email,
    };
  }

  public async create(userType: UserType, shoppingListId: string) {
    const now = new Date();

    const user = await this.userRepository.findById(userType.id);

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    await this.collaboratorRepository.create({
      id: UUIDGenerator.generate(),
      name: user.name,
      userId: userType.id,
      shoppingListId: shoppingListId,
      createdAt: now,
    });
  }
}
