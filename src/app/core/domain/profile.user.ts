export class UserProfile {
    constructor(
        id: string,
        userName: string,
        fullName: string,
        email: string,
        avatar: string,
        dateOfBirth: Date,
        phone: string,
        cccd: string,
        address: string
    ) {
        this.id = id
        this.userName = userName
        this.fullName = fullName
        this.email = email
        this.avatar = avatar
        this.dateOfBirth = dateOfBirth
        this.phone = phone
        this.cccd = cccd
        this.address = address
    }
    public id: string;
    public userName: string;
    public fullName: string;
    public email: string;
    public avatar: string;
    public dateOfBirth: Date;
    public phone: string;
    public cccd: string;
    public address: string;
}