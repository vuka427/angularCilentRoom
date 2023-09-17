export class UserProfile {
    constructor(
        id: string,
        username: string,
        fullname: string,
        email: string,
        avatar: string,
        dateofbirth: Date,
        phone: string,
        cccd: string,
        address: string
    ) {
        this.id = id
        this.username = username
        this.fullname = fullname
        this.email = email
        this.avatar = avatar
        this.dateofbirth = dateofbirth
        this.phone = phone
        this.cccd = cccd
        this.address = address
    }
    public id?: string;
    public username: string;
    public fullname: string;
    public email: string;
    public avatar: string;
    public dateofbirth: Date;
    public phone: string;
    public cccd: string;
    public address: string;
}