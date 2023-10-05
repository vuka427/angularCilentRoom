import { DeviceModel } from "./device.model"
import { ImageRoomModel } from "./image.room"


export class RoomModel {
    constructor(
        id: number,
        roomNumber: string,
        acreage: number,
        isMezzanine: boolean,
        price: number,
        status: string,
        maxMember: number,
        devices: DeviceModel[],
        imageRooms: ImageRoomModel[]
    ) {
        this.id = id
        this.roomNumber = roomNumber
        this.acreage = acreage
        this.isMezzanine = isMezzanine
        this.price = price
        this.status = status
        this.maxMember = maxMember
        this.devices = devices
        this.imageRooms = imageRooms
    }

    public id: number
    public roomNumber: string
    public acreage: number
    public isMezzanine: boolean
    public price: number
    public status: string
    public maxMember: number
    public devices: DeviceModel[]
    public imageRooms: ImageRoomModel[]

}