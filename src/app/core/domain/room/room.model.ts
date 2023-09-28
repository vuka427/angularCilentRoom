export class RoomModel {
    constructor(
        roomNumber: string,
        width: number,
        height: number,
        length: number,
        isMezzanine: boolean,
        price: number,
        status: string,
        maxMember: number
    ) {
        this.roomNumber = roomNumber
        this.width = width
        this.height = height
        this.length = length
        this.isMezzanine = isMezzanine
        this.price = price
        this.status = status
        this.maxMember = maxMember
    }
    public roomNumber: string;
    public width: number;
    public height: number;
    public length: number;
    public isMezzanine: boolean;
    public price: number;
    public status: string;
    public maxMember: number;

}