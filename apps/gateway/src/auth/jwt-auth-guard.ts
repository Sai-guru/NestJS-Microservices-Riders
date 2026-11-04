
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service.js';
import { Reflector } from '@nestjs/core';
import { UsersService } from '../users/user.service.js';
import { IS_PUBLIC_KEY } from './public.decorator.js';
import { REQUIRED_ROLE_KEY } from './admin.decorator.js';

@Injectable()
export class JwtAuthGuard implements CanActivate {

    constructor(
        private readonly reflector: Reflector,
        private readonly authService: AuthService,
        private readonly usersService : UsersService ) {}

        //take from the docs : https://docs.nestjs.com/guards#execution-context
    async canActivate( context: ExecutionContext):  Promise<boolean>{
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

        //extract the token from the authorization bearer token
        const token = authorization.startsWith('Bearer ') ? authorization.slice('Bearer '.length).trim() : '';

        if(!token) {
            // return false;
             throw new UnauthorizedException("Missing auth token");
        }
        //verify the token and build the user context

        const identifyAuthUser = await this.authService.verifyAndBuildContext(token);

        const dbUser = await this.usersService.upsertAuthUser({
            clerkUserId: identifyAuthUser.clerkUserId,
            email: identifyAuthUser.email,
            name: identifyAuthUser.name,
        });
        
        if (!dbUser) {
    throw new UnauthorizedException("Unable to identify user");
}

        const user = {
            ...identifyAuthUser,
            role: dbUser.role,
        }

        //attach users, so controllers can read it via @currentuser()
        req.user = user;

        const requiredRole = this.reflector.getAllAndOverride<string>(REQUIRED_ROLE_KEY, [
            context.getHandler(),
            context.getClass()
        ]);

        //admin access required, but the user is not an admin
        if(requiredRole === 'admin' && user.role !== 'admin') {
            throw new ForbiddenException("Admin access required");
        }
        return true;
        
        
  }
}
