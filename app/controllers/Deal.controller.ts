import { Deal } from "../models/Deal.model.js";
import { DealService } from "../services/Deal.service.js";
import { DealView } from "../views/Deal.view.js";


export class DealController {
    private dealService: DealService;
    private dealView: DealView;

    constructor(dealService: DealService, dealView: DealView) {
        this.dealService = dealService
        this.dealView = dealView
        this.dealService.bindDealListChanged(this.onDealListChanged)

        this.onDealListChanged(this.dealService.deals)

        this.dealView.bindAddDeal(this.handleAddDeal);
    }

    onDealListChanged = (deals: Deal[]) => {
        this.dealView.displayDeals(deals);
        // Rebind deletes
        this.dealView.bindDeleteDeal(this.handleDeleteDeal, deals);
    };

    handleAddDeal = (deal: Deal) => {
        this.dealService.add(deal)
    }

    handleDeleteDeal = (id: string) => {
        this.dealService.delete(id)
    }
}
