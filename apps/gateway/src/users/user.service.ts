import { Injectable } from "@nestjs/common";
import { User, UserDocument } from "./user.schema.js";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

    interface Input {
        clerkUserId: string;
        email: string;
        name: string;
    }


@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>){}

    async upsertAuthUser( ip : Input) {

        const filter  = { clerkUserId: ip.clerkUserId };

        const update = {  email: ip.email,name: ip.name,
            lastSeenAt: new Date() };

            //  Upsert is a combination of Update + Insert.

        const options = { upsert: true, new: true, setDefaultsOnInsert: true };
//         Mongoose automatically turns it into this before sending it to MongoDB:
// typescript
// const update = {  
//   $set: {
//     email: ip.email,
//     name: ip.name,
//     lastSeenAt: new Date() 
//   }
// };            
// "Look for this user. If they exist, Update them. If they do not exist, Insert a brand new document using the data I gave you."

        const user = await this.userModel.findOneAndUpdate(filter, update, options);
        return user;
    }
    

    async findByClerkUserId(clerkUserId: string) {

        return this.userModel.findOne({ clerkUserId });
    }
}