export class OrderDTO {
    constructor(
        public email: string,
        public productName: string,
        public quantity: number,
    ){}

}