import { Injectable } from "@nestjs/common";
import { createClerkClient} from "@clerk/backend";

@Injectable()
export class AuthService {

    private readonly clerk  = createClerkClient({
        secretKey: process.env.CLERK_SECRET_KEY,
        publishableKey: process.env.CLERK_PUBLISHABLE_KEY
    })

    private jwtVerifyOptions() : Record<string, any> {
        return {secretKey: process.env.CLERK_SECRET_KEY}
    }


}