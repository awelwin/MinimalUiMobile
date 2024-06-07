import { IEntity } from "./IEntity";


export class TaxFileRecord implements IEntity {

    readonly resourceName: string = "";
    id: number = 0;
    financialYear: number = 0;
    amountPaid: number = 0;
    amountClaimed: number = 0;
    taxFileId: number = 0;
    created: Date = new Date();
    updated: Date = new Date();

    constructor() {

    }
}