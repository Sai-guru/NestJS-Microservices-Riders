
// Validating custom decorators in docs refer
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserContext } from './auth.types.js';

export const CurrentUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) =>{
    const req = ctx.switchToHttp().getRequest();

    return req.user as UserContext | undefined;
  },
  
   
);
