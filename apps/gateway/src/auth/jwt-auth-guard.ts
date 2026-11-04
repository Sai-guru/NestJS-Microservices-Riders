
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service.js';
import { Reflector } from '@nestjs/core';
import { UsersService } from '../users/user.service.js';
import { IS_PUBLIC_KEY } from './public.decorator.js';

@Injectable()
export class JwtAuthGuard implements CanActivate {

    constructor(
        private readonly reflector: Reflector,
        private readonly authService: AuthService,
        private readonly usersService : UsersService ) {}

        //take from the docs : https://docs.nestjs.com/guards#execution-context
    canActivate( context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        //if the handler is marked as public means anyone can access this route.
        
        //flagged as public handler
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY ,
            [ context.getHandler(), context.getClass() ]);
        
        if(isPublic) {
            return true;
        }
        //access the headers
        const req = context.switchToHttp().getRequest();
        const authorization = req.headers['authorization'];

        if(!authorization || typeof(authorization)!== 'string') {
            throw new UnauthorizedException("Missing or invalid authorization header");
        }

        const token = authorization.split(' ')[1];
        if(!token) {
            return false;
        }
        //verify the token and build the user context
        return this.authService.verifyAndBuildContext(token)
            .then(async (userContext) => {
                //upsert the user in the database
                await this.usersService.upsertAuthUser(userContext);
                //attach the user context to the request object
                req.user = userContext;
                return true;
            })
            .catch((err) => {
                console.error("Error verifying token:", err);
                return false;
            });
    
  }
}
