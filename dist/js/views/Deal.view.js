export class DealView {
    constructor() {
        this.app = this.getElement("#root-app");
        this.form = this.createElement('form');
        this.inputDate = this.createInput({
            id: 'date',
            type: 'date',
            placeholder: 'Date',
            name: 'date',
            value: this.formatDateValue(new Date()),
            required: true,
            autofocus: true
        });
        this.inputQuantity = this.createInput({
            id: 'quantity',
            type: 'number',
            placeholder: 'Quantity',
            name: 'quantity',
            value: '1',
            required: true
        });
        this.inputValue = this.createInput({
            id: 'value',
            type: 'number',
            placeholder: 'Value',
            name: 'value',
            value: '0.0',
            required: true,
            min: "0.01",
            step: "0.01"
        });
        this.generateFormGroup(this.inputDate);
        this.generateFormGroup(this.inputQuantity);
        this.generateFormGroup(this.inputValue);
        this.submitButton = this.createElement('button', ['btn', 'btn-primary']);
        this.submitButton.textContent = 'Create';
        this.submitButton.setAttribute('type', 'submit');
        this.form.append(this.submitButton);
        const responsiveDiv = this.createElement('div', 'table-responsive');
        this.dealTable = this.createElement('table', ['table', 'my-4', 'table-bordered', 'table-hover']);
        responsiveDiv.append(this.dealTable);
        this.title = this.createElement('h1', ['title', 'my-2']);
        this.title.textContent = "Create a new deal";
        this.app.append(this.title, this.form, responsiveDiv);
    }
    get _date() {
        return this.inputDate.value;
    }
    get _quantity() {
        return this.inputQuantity.value;
    }
    get _value() {
        return this.inputValue.value;
    }
    _resetInput() {
        this.inputDate.value = this.formatDateValue(new Date());
        this.inputQuantity.value = "1";
        this.inputValue.value = "0.0";
    }
    createElement(tag, className) {
        const element = document.createElement(tag);
        if (typeof className === 'string')
            element.classList.add(className);
        // Array
        if (typeof className === 'object')
            className.forEach((item) => {
                element.classList.add(item);
            });
        return element;
    }
    getElement(selector) {
        return document.querySelector(selector);
    }
    createInput({ id, type, placeholder, name, value, required, autofocus, min, step } = {
        id: 'default',
        type: 'text',
        placeholder: 'default',
        name: 'default',
        value: '',
        required: true
    }) {
        const input = this.createElement('input', 'form-control');
        input.setAttribute('id', id);
        if (required) {
            input.setAttribute('required', '');
        }
        if (autofocus) {
            input.setAttribute('autofocus', '');
        }
        if (min) {
            input.setAttribute('min', min);
        }
        if (step) {
            input.setAttribute('step', step);
        }
        input.type = type;
        input.placeholder = placeholder;
        input.name = name;
        input.value = String(value);
        return input;
    }
    generateFormGroup(input) {
        const placeholder = input.placeholder;
        const group = this.createElement('div', 'form-group');
        const label = this.createElement('label');
        label.textContent = placeholder;
        label.setAttribute('for', input.id);
        group.append(label, input);
        this.form.append(group);
    }
    generateTableListHeader(table) {
        const thead = this.createElement('thead', ['thead-dark']);
        const trTitle = this.createElement('tr');
        const thTitle = this.createElement('th', 'text-center');
        thTitle.textContent = 'DEALS LIST';
        thTitle.setAttribute('colspan', '5');
        trTitle.append(thTitle);
        const trLegend = this.createElement('tr');
        const trLegendsItems = ['# ID', 'DATE', 'QUANTITY', 'VALUE', 'ACTIONS'];
        trLegendsItems.forEach((item) => {
            const th = this.createElement('th', 'text-center');
            th.setAttribute('scope', 'col');
            th.textContent = item;
            trLegend.append(th);
        });
        thead.append(trTitle, trLegend);
        table.append(thead);
    }
    displayDeals(deals) {
        // Delete all nodes
        while (this.dealTable.firstChild) {
            this.dealTable.removeChild(this.dealTable.firstChild);
        }
        this.generateTableListHeader(this.dealTable);
        const tbody = this.createElement('tbody');
        // Show default message
        if (deals.length === 0) {
            const trNullDeal = this.createElement('tr');
            const tdNullDeal = this.createElement('td', 'text-center');
            tdNullDeal.textContent = 'Any deals! Add a new deal';
            tdNullDeal.setAttribute('colspan', '5');
            trNullDeal.append(tdNullDeal);
            tbody.append(trNullDeal);
            this.dealTable.append(tbody);
            return;
        }
        // Create nodes
        deals.forEach(deal => {
            const tr = this.createElement('tr');
            const tdDealValues = [
                deal.id,
                this.formateDateIntl(String(deal.date)),
                String(deal.quantity),
                String(deal.value),
                ''
            ];
            tdDealValues.forEach((item) => {
                const td = this.createElement('td', 'text-center');
                td.textContent = item;
                tr.append(td);
                if (item === '') {
                    const a = this.createElement('a');
                    const i = this.createElement('i', ['material-icons', 'fa-solid', 'fa-trash']);
                    a.setAttribute('href', '#');
                    a.setAttribute('data-delete', 'delete');
                    i.setAttribute('data-toggle', 'tooltip');
                    i.setAttribute('title', 'Delete');
                    a.append(i);
                    td.append(a);
                }
            });
            tbody.append(tr);
            this.dealTable.append(tbody);
        });
        this.dealTable.append(tbody);
    }
    bindAddDeal(handler) {
        this.form.addEventListener('submit', event => {
            event.preventDefault();
            if (this._date, this._quantity, this._value) {
                handler({
                    date: this._date,
                    quantity: this._quantity,
                    value: this._value
                });
                this._resetInput();
            }
        });
    }
    bindDeleteDeal(handler, deals) {
        const deleteHandler = this.getElement('tbody').querySelectorAll('tr > td > a[data-delete="delete"]');
        deleteHandler.forEach((link, i) => {
            link.addEventListener('click', event => {
                handler(deals[i].id);
            });
        });
    }
    formatDateValue(date) {
        return date.toISOString().substring(0, 10);
    }
    formateDateIntl(date) {
        const d = new Date(date);
        return Intl.DateTimeFormat('pt-br', { timeZone: 'UTC' }).format(d);
    }
}
