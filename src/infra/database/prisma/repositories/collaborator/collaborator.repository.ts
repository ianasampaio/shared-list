import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Collaborator } from 'src/modules/collaborator/entities/collaborator.entity';
import { CollaboratorEntityToModelMapper } from './mappers/collaborator-entity-to-model.mapper';

@Injectable()
export class CollaboratorRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async create(collaborator: Collaborator): Promise<void> {
    const data = CollaboratorEntityToModelMapper.map(collaborator);

    await this.prismaService.collaborator.create({
      data,
    });
  }
}
