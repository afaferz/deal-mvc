export class DealController {
    constructor(dealService, dealView) {
        this.onDealListChanged = (deals) => {
            this.dealView.displayDeals(deals);
            // Rebind deletes
            this.dealView.bindDeleteDeal(this.handleDeleteDeal, deals);
        };
        this.handleAddDeal = (deal) => {
            this.dealService.add(deal);
        };
        this.handleDeleteDeal = (id) => {
            this.dealService.delete(id);
        };
        this.dealService = dealService;
        this.dealView = dealView;
        this.dealService.bindDealListChanged(this.onDealListChanged);
        this.onDealListChanged(this.dealService.deals);
        this.dealView.bindAddDeal(this.handleAddDeal);
    }
}
