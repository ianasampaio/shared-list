import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { CollaboratorService } from './collaborator.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  InviteCollaboratorDto,
  InviteCollaboratorResponseDto,
} from './dto/invite-collaborator.dto';
import { InviteCollaboratorValidationInterceptor } from './interceptors/invite-collaborator.interceptor';
import {
  ActiveUser,
  UserType,
} from 'src/shared/decorators/active-user.decorator';
import { AuthValidationInterceptor } from 'src/shared/interceptors/auth.interceptor';
import { ShoppingListId } from 'src/shared/decorators/shopping-list-id.decorator';

@Controller('collaborators')
@UseInterceptors(AuthValidationInterceptor)
export class CollaboratorController {
  constructor(private readonly collaboratorService: CollaboratorService) {}

  @Post('/send-invitation')
  @ApiOperation({
    summary: 'Send invitation to an user to collaborate on a shopping list',
  })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ type: InviteCollaboratorResponseDto })
  sendInvitation(@Body() inviteCollaboratorDto: InviteCollaboratorDto) {
    return this.collaboratorService.sendInvitation(inviteCollaboratorDto);
  }

  @Post()
  @ApiOperation({ summary: 'Create a collaborator' })
  @UseInterceptors(InviteCollaboratorValidationInterceptor)
  create(
    @ShoppingListId() shoppingListId: string,
    @ActiveUser() userType: UserType,
  ) {
    return this.collaboratorService.create(userType, shoppingListId);
  }
}
