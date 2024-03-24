import { RoomModel } from "./room.model"

export class AreaModel {
    constructor(areaName: string, description: string, rooms: RoomModel[]) {
        this.areaName = areaName
        this.description = description
        this.rooms = rooms
    }

    public areaName: string
    public description: string
    public rooms: RoomModel[]

}