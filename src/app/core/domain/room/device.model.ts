

export class DeviceModel {
    constructor(
        id: number,
        deviceName: string,
        description: string,
        quantity: string
    ) {
        this.id = id
        this.deviceName = deviceName
        this.description = description
        this.quantity = quantity
    }
    public id: number
    public deviceName: string
    public description: string
    public quantity: string
}
