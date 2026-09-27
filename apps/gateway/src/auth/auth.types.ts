

// saving the user collections data(from clerk) to mongo db too , we do have the info registered in clerk btw...

export type UserContext = {
    clerkUSerId: string;

    email : string;
    name : string;
    // phone : number;
    role : 'user' | 'admin';

    isAdmin : boolean;
}