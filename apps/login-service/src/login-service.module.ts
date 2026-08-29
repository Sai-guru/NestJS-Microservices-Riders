import { Module } from '@nestjs/common';
import { LoginServiceController } from './login-service.controller.js';
import { LoginServiceService } from './login-service.service.js';

@Module({
  imports: [],
  controllers: [LoginServiceController],
  providers: [LoginServiceService],
})
export class LoginServiceModule {}
