package event_newsletter.consumer_java;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class Receiver {
    
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    private RabbitTemplate rabbitTemplate;

    @RabbitListener(queues = "concerts_queue")
    public void receiveMessage(byte[] message) {
        try {
            JsonNode jsonNode = objectMapper.readTree(message);
            JsonNode concertData = jsonNode.get("data");
    
            ConcertDTO concert = objectMapper.treeToValue(concertData, ConcertDTO.class);
    
            String newsletterMessage = String.format(
                "🎵 **Concert Announcement!** 🎵\n\n" +
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

        } catch (Exception e) {
            System.err.println("Failed to process message: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
