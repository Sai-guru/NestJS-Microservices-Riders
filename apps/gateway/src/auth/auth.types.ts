

// saving the user collections data(from clerk) to mongo db too , we do have the info registered in clerk btw...

export type UserContext = {
    clerkUserId: string;

    email : string;
    name : string;
    // phone : number;
    role : 'user' | 'admin';

    // isAdmin : boolean;
}