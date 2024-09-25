package event_newsletter.consumer_java;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class Receiver {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    private RabbitTemplate rabbitTemplate;

    public void receiveMessage(byte[] message) {
        try {
            String messageString = new String(message);
            // System.out.println("Mensagem recebida: " + messageString);

            ConcertDTO concert = objectMapper.readValue(message, ConcertDTO.class);

            if (concert != null) {
                String newsletterMessage = String.format(
                    "\n🎵 **Concert Announcement!** 🎵\n\n" +
                    "**Event Name:** %s\n" +
                    "**Description:** %s\n\n" +
                    "**Ticket Information:**\n" +
                    "- **Price:** $%.2f\n" +
                    "- **Available Tickets:** %d\n\n" +
                    "**Event Date:**\n" +
                    "📅 %s\n\n" +
                    "Get your tickets now and enjoy an unforgettable experience!\n\n" +
                    "Stay tuned for more updates!",
                    concert.getName(),
                    concert.getDescription(),
                    concert.getPrice(),
                    concert.getQuantity(),
                    concert.getDate()
                );

                System.out.println(newsletterMessage);
            } 
            
            else {
                System.err.println("ConcertDTO is null. Failed to map message to ConcertDTO.");
            }

        } 
        
        catch (Exception e) {
            System.err.println("Failed to process message: " + e.getMessage());
            e.printStackTrace();
        }
    }
}