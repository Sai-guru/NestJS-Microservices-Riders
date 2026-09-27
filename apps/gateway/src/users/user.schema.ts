import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

// Mongoose (MongoDB + NestJS/Node): 
// By default, Mongoose automatically pluralizes and converts the class name User to lowercase, naming your MongoDB collection users.
// Automatically pluralizes and lowercases the model name (e.g., User becomes users, AdminProfile becomes adminprofiles). You can override this in NestJS using @Schema({ collection: 'my_custom_name' }).

@Schema({ timestamps: true, collection: 'users'})
export class User {

    @Prop({ required: true, unique: true ,index: true })
    clerkUserId: string;

    @Prop({ required: true, unique: true})
    email: string;
    
    @Prop({ required: true ,maxLength: 20})
    name: string;

    @Prop({ required: true ,enum: ['user', 'admin'],default: 'user'})
    role : 'user' | 'admin';

    @Prop({ required: true})
    lastSeenAt : Date;

    @Prop({ required: true})
    age : number;


}

export const UserSchema = SchemaFactory.createForClass(User);


