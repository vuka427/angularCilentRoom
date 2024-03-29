export class LoggedInUser {
    constructor(access_token: string, username: string, fullName: string, email: string, avatar: string,roles:any,permissions:any, usertype: any
    ) {
        this.access_token = access_token;
        this.fullname = fullName;
        this.username = username;
        this.email = email;
        this.avatar = avatar;
        this.roles = roles;
        this.permissions = permissions;
        this.usertype = usertype;
    }

    public userid?: string;
    public access_token: string;
    public username: string;
    public fullname: string;
    public email: string;
    public avatar: string;
    public permissions:any;
    public roles: any;
    public usertype: string;
}