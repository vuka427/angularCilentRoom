

export class InvoiceDetailModel {

    constructor(
        id: number,
        lesee: string,
        roomNumber: string,
        invoiceCode: string,
        isApproved: boolean,
        oldElectricNumber: number,
        oldWaterNumber: number,
        newElectricNumber: number,
        newWaterNumber: number,
        rentalPrice: number,
        electricityCosts: number,
        waterCosts: number,
        totalPrice: number,
        contractId: number,
        month: string,
        year: string,
        serviceItems: any[]
    ) {
        this.id = id
        this.lesee = lesee
        this.roomNumber = roomNumber
        this.invoiceCode = invoiceCode
        this.isApproved = isApproved
        this.oldElectricNumber = oldElectricNumber
        this.oldWaterNumber = oldWaterNumber
        this.newElectricNumber = newElectricNumber
        this.newWaterNumber = newWaterNumber
        this.rentalPrice = rentalPrice
        this.electricityCosts = electricityCosts
        this.waterCosts = waterCosts
        this.totalPrice = totalPrice
        this.contractId = contractId
        this.month = month
        this.year = year
        this.serviceItems = serviceItems
    }

    id: number
    lesee: string
    roomNumber: string
    invoiceCode: string
    isApproved: boolean
    oldElectricNumber: number
    oldWaterNumber: number
    newElectricNumber: number
    newWaterNumber: number
    rentalPrice: number
    electricityCosts: number
    waterCosts: number
    totalPrice: number
    contractId: number
    month: string
    year: string
    serviceItems: any[]

}