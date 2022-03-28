"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deal = void 0;
class Deal {
    constructor({ date, quantity, value } = {
        date: new Date(),
        quantity: 1,
        value: 0.0
    }) {
        this.date = date;
        this.quantity = quantity;
        this.value = value;
    }
}
exports.Deal = Deal;
