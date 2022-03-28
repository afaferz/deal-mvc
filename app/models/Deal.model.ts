export interface DealDTO {
    date: string | Date;
    quantity: number;
    value: number;
}

export class Deal {
    public id: string;
    public date: string | Date;
    public quantity: number;
    public value: number;

    constructor({
        date,
        quantity,
        value
    }: DealDTO = {
            date: new Date() || "",
            quantity: 1,
            value: 0.0
        }
    ) {
        this.id = Deal.uuidv4();
        this.date = date
        this.quantity = quantity
        this.value = value
    }

    static uuidv4(): string {
        return (([1e7] as any) + -1e3 + -4e3 + -8e3 + -1e11).replace(
            /[018]/g,
            (c: number) =>
                (
                    c ^
                    (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
                ).toString(16)
        );
    }
}
