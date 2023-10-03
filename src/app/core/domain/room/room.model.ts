export class RoomModel {
    constructor(
        roomNumber: string,
        acreage: number,
        isMezzanine: boolean,
        price: number,
        status: string,
        maxMember: number
    ) {
        this.roomNumber = roomNumber
        this.acreage = acreage
        this.isMezzanine = isMezzanine
        this.price = price
        this.status = status
        this.maxMember = maxMember
    }
    public roomNumber: string;
    public acreage: number;
    public isMezzanine: boolean;
    public price: number;
    public status: string;
    public maxMember: number;

}