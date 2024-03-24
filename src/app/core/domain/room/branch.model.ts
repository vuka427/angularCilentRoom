import { AreaModel } from "./area.model"

export class BranchModel {


    constructor(
        branchName: string,
        description: string,
        province: number,
        district: number,
        wards: number,
        address: string,
        electricityCosts: number,
        waterCosts: number,
        internetCosts: number,
        garbageColletionFee: number,
        internalRegulation: string,
        houseType: string,
        area: AreaModel[]
    ) {
        this.branchName = branchName
        this.description = description
        this.province = province
        this.district = district
        this.wards = wards
        this.address = address
        this.electricityCosts = electricityCosts
        this.waterCosts = waterCosts
        this.internetCosts = internetCosts
        this.garbageColletionFee = garbageColletionFee
        this.internalRegulation = internalRegulation
        this.houseType = houseType
        this.area = area
    }

    public branchName: string
    public description: string
    public province: number
    public district: number
    public wards: number
    public address: string
    public electricityCosts: number
    public waterCosts: number
    public internetCosts: number
    public garbageColletionFee: number
    public internalRegulation: string
    public houseType: string
    public area: AreaModel[]

}