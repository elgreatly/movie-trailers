export class TrailerResponse {
    status: number;
    trailer: string[];

    constructor(init?: Partial<TrailerResponse>) {
        Object.assign(this, init);
    }

}
