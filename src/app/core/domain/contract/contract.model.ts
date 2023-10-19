
export class ContractModel {

    constructor(
        id: number,
        b_Lessee: string,
        b_DateOfBirth: string,
        b_Cccd: string,
        b_DateOfIssuance: string,
        b_PlaceOfIssuance: string,
        b_PermanentAddress: string,
        b_Phone: string,
        rentalPrice: string,
        electricityCosts: string,
        waterCosts: string,
        commencingOn: string,
        endingOn: string,
        status: string,
        roomNumber: string,
        branchName: string,
        branchAddress: string,
        houseType: string,
        areaName: string,
        acreage: string,
        isMezzanine: string,
        termsOfContract: string,
        deposit: string
    ) {
        this.id = id
        this.b_Lessee = b_Lessee
        this.b_DateOfBirth = b_DateOfBirth
        this.b_Cccd = b_Cccd
        this.b_DateOfIssuance = b_DateOfIssuance
        this.b_PlaceOfIssuance = b_PlaceOfIssuance
        this.b_PermanentAddress = b_PermanentAddress
        this.b_Phone = b_Phone
        this.rentalPrice = rentalPrice
        this.electricityCosts = electricityCosts
        this.waterCosts = waterCosts
        this.commencingOn = commencingOn
        this.endingOn = endingOn
        this.status = status
        this.roomNumber = roomNumber
        this.branchName = branchName
        this.branchAddress = branchAddress
        this.houseType = houseType
        this.areaName = areaName
        this.acreage = acreage
        this.isMezzanine = isMezzanine
        this.termsOfContract = termsOfContract
        this.deposit = deposit
    }

    id: number
    b_Lessee: string
    b_DateOfBirth: string
    b_Cccd: string
    b_DateOfIssuance: string
    b_PlaceOfIssuance: string
    b_PermanentAddress: string
    b_Phone: string
    rentalPrice: string
    electricityCosts: string
    waterCosts: string
    commencingOn: string
    endingOn: string
    status: string
    roomNumber: string
    branchName: string
    branchAddress: string
    houseType: string
    areaName: string
    acreage: string
    isMezzanine: string
    termsOfContract: string
    deposit: string


}