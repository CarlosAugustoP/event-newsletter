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

    // Método genérico para receber mensagens de diferentes filas
    @RabbitListener(queues = {
        "concert_queue", 
        "culture_queue", 
        "convention_queue", 
        "sertanejo_queue", 
        "pop_queue", 
        "rap_queue", 
        "conference_queue"
    })
    public void receiveMessage(byte[] message) {
        try {
            String messageString = new String(message);
            System.out.println("Mensagem recebida: " + messageString);
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

    // Este método não é necessário para o RabbitListener, mas pode ser útil em outros contextos
    public String getQueueNameByType(int tipo) {
        switch (tipo) {
            case 1:
                return "concert_queue";
            case 2:
                return "culture_queue";
            case 3:
                return "convention_queue";
            case 4:
                return "sertanejo_queue";
            case 5:
                return "pop_queue";
            case 6:
                return "rap_queue";
            case 7:
                return "conference_queue";
            default:
                return null;
        }
    }
}
