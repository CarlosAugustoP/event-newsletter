export class EventDTO {
    constructor(
      public name: string, // nome do evento 
      public quantity: number, // quantidade de ingressos
      public description: string, // descrição do evento
      public price: number, // preço do ingresso
      public date: string, // data do evento
    ) {}
  }
  