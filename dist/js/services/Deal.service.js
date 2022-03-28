import { Deal } from "../models/Deal.model.js";
export class DealService {
    constructor() {
        const deals = JSON.parse(localStorage === null || localStorage === void 0 ? void 0 : localStorage.getItem('deals')) || [];
        this.deals = deals.map(deal => new Deal(deal));
        this.onDealListChange = () => { };
    }
    bindDealListChanged(cb) {
        this.onDealListChange = cb;
    }
    add(deal) {
        this.deals.push(new Deal(deal));
        this._commit(this.deals);
    }
    delete(_id) {
        this.deals = this.deals.filter(({ id }) => id !== _id);
        this._commit(this.deals);
    }
    _commit(deals) {
        const dealsJSON = JSON.stringify(deals);
        localStorage.setItem("deals", dealsJSON);
        this.onDealListChange(this.deals);
    }
}
