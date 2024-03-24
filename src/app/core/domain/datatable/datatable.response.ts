export class DataTablesResponse {
   
    constructor(
        data: any[],
        draw: number,
        recordsFiltered: number,
        recordsTotal: number
    ) {
        this.data = data
        this.draw = draw
        this.recordsFiltered = recordsFiltered
        this.recordsTotal = recordsTotal
    }
    data: any[];
    draw: number;
    recordsFiltered: number;
    recordsTotal: number;
}