import { Injectable } from "@nestjs/common";
import { createClerkClient, verifyToken} from "@clerk/backend";
import { UserContext } from "./auth.types.js";

@Injectable()
export class AuthService {

    private readonly clerk  = createClerkClient({
        secretKey: process.env.CLERK_SECRET_KEY,
        publishableKey: process.env.CLERK_PUBLISHABLE_KEY
    })

    private jwtVerifyOptions() : Record<string, any> {
        return {secretKey: process.env.CLERK_SECRET_KEY}
    }

    async verifyAndBuildContext(token: string):Promise<UserContext> {
        // Implementation for verifying and building context
        try{
            const verified : any = await verifyToken(token, this.jwtVerifyOptions());

            //decoded payload from the token
            const payload = verified.payload ?? verified.payload ?? verified;

            // Extract user information from the payload
            const clerkUserId = payload.sub ?? payload.userId;

            if(!clerkUserId) {
                throw new Error("Token is missing user id");
            }

            const role : 'user' | 'admin' = 'user';
            const emailFromToken = payload?.email ?? payload?.primaryEmailAddress ?? payload?.email_address ?? '';
            const nameFromToken = payload?.name ?? payload?.fullName ?? payload?.username ?? '';

            if(emailFromToken && nameFromToken) {
                return {
                    clerkUserId,
                    email: emailFromToken,
                    name: nameFromToken,
                    role
                } };

            const user = await this.clerk.users.getUser(clerkUserId);
            const primaryEmail = user.emailAddresses.find(e => e.id === user.primaryEmailAddressId)?.emailAddress ?? user.emailAddresses[0]?.emailAddress ?? '';
            const fullName = [user.firstName,user.lastName].filter(Boolean).join(' ') || user.username || primaryEmail || clerkUserId;

            return {clerkUserId, email: primaryEmail || emailFromToken, name: fullName || nameFromToken,role}
            
        }catch(err){
            console.error("Error verifying token:", err);
            throw new Error("Invalid token");
        }
    }
}