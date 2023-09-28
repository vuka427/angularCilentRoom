import { RoomModel } from "./room.model"

export class AreaModel {
    constructor(areaName: string, description: string, room: RoomModel[]) {
        this.areaName = areaName
        this.description = description
        this.room = room
    }

    public areaName: string
    public description: string
    public room: RoomModel[]

}