import { Injectable } from "@nestjs/common";
import { User, UserDocument } from "./user.schema.js";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";




@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>
    ){}

    


}