import { Deal, DealDTO } from "../models/Deal.model.js";

export class DealService {
    public deals: Deal[];
    private onDealListChange: Function;

    constructor() {
        const deals: DealDTO[] = JSON.parse(localStorage?.getItem('deals')!) || [];
        this.deals = deals.map(deal => new Deal(deal))
        this.onDealListChange = () => { }
    }

    bindDealListChanged(cb: Function) {
        this.onDealListChange = cb
    }

    add(deal: Deal) {
        this.deals.push(new Deal(deal))
        this._commit(this.deals)
    }

    delete(_id: string) {
        this.deals = this.deals.filter(({ id }) => id !== _id);
        this._commit(this.deals)
    }

    _commit(deals: Deal[]) {
        const dealsJSON = JSON.stringify(deals)
        localStorage.setItem("deals", dealsJSON)
        this.onDealListChange(this.deals)
    }
}

