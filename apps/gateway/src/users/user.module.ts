import { Module } from "@nestjs/common";
import { User, UserSchema } from "./user.schema.js";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersService } from "./user.service.js";


@Module({
  imports: [
    //registers the user model for DI...
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ], 
//providers is for using it in curr module...
  providers: [UsersService],

  exports: [UsersService], //exports is for using it in other modules..
})

export class UsersModule {}