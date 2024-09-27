import { Injectable } from '@nestjs/common';
import { ConcertDTO } from './concert.dto';

@Injectable()
export class AppService {
    handleConcertPlaced(concert: ConcertDTO) {
        const newsletterMessage = `
        🎵 **Concert Announcement!** 🎵

        **Event Name:** ${concert.name}
        **Description:** ${concert.description}

        **Ticket Information:**
        - **Price:** $${concert.price}
        - **Available Tickets:** ${concert.quantity}

        **Event Date:**
        📅 ${concert.date}

        Get your tickets now and enjoy an unforgettable experience!

        Stay tuned for more updates!
        `;

        console.log(newsletterMessage);
        return { message: "Concert newsletter generated successfully" };
    }
}
