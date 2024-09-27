export class ConcertDTO {
    constructor(
        public name: string,
        public quantity: number,
        public description: string,
        public price: number,
        public date: string,
    ){}

}