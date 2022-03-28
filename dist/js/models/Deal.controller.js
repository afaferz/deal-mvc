"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deal = void 0;
class Deal {
    constructor({ date, quantity, value } = {
        date: new Date(),
        quantity: 1,
        value: 0.0
    }) {
        this._date = date;
        this._quantity = quantity;
        this._value = value;
    }
    addDeal() {
        console.log(this._date, this._quantity, this._value);
    }
}
exports.Deal = Deal;
