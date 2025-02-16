import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

export const ShoppingListId = createParamDecorator<undefined>(
  (data, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const shoppingListId = request.shoppingListId;

    if (!shoppingListId) {
      throw new BadRequestException('Shopping List ID é obrigatório');
    }

    return shoppingListId;
  },
);
