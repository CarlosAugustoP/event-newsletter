package event_newsletter.consumer;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Scanner;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.HeadersExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.listener.SimpleMessageListenerContainer;
import org.springframework.amqp.rabbit.listener.adapter.MessageListenerAdapter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ConsumerJavaApplication {

    static final String rockQueue = "rock_concerts_queue";
    static final String cultureQueue = "culture_queue";
    static final String conventionQueue = "convention_queue";
    static final String sertanejoQueue = "sertanejo_concert_queue";
    static final String popQueue = "pop_concert_queue";
    static final String rapQueue = "rap_concert_queue";
    static final String conferenceQueue = "conference_queue";

    static final String headersExchangeName = "concert_headers_exchange";
    
    public static List<String> chosenQueues = new ArrayList<>();

    @Bean
    Queue rockQueue() {
        return new Queue(rockQueue, false);
    }

    @Bean
    Queue cultureQueue() {
        return new Queue(cultureQueue, false);
    }

    @Bean
    Queue conventionQueue() {
        return new Queue(conventionQueue, false);
    }

    @Bean
    Queue sertanejoQueue() {
        return new Queue(sertanejoQueue, false);
    }

    @Bean
    Queue popQueue() {
        return new Queue(popQueue, false);
    }

    @Bean
    Queue rapQueue() {
        return new Queue(rapQueue, false);
    }

    @Bean
    Queue conferenceQueue() {
        return new Queue(conferenceQueue, false);
    }

    @Bean
    HeadersExchange headersExchange() {
        return new HeadersExchange(headersExchangeName);
    }

    @Bean
    Binding rockBinding(Queue rockQueue, HeadersExchange headersExchange) {
        Map<String, Object> headerValues = new HashMap<>();
        headerValues.put("genre", "rock");
        return BindingBuilder.bind(rockQueue).to(headersExchange).whereAll(headerValues).match();
    }

    @Bean
    Binding cultureBinding(Queue cultureQueue, HeadersExchange headersExchange) {
        Map<String, Object> headerValues = new HashMap<>();
        headerValues.put("genre", "culture");
        return BindingBuilder.bind(cultureQueue).to(headersExchange).whereAll(headerValues).match();
    }

    @Bean
    Binding conventionBinding(Queue conventionQueue, HeadersExchange headersExchange) {
        Map<String, Object> headerValues = new HashMap<>();
        headerValues.put("genre", "convention");
        return BindingBuilder.bind(conventionQueue).to(headersExchange).whereAll(headerValues).match();
    }

    @Bean
    Binding sertanejoBinding(Queue sertanejoQueue, HeadersExchange headersExchange) {
        Map<String, Object> headerValues = new HashMap<>();
        headerValues.put("genre", "sertanejo");
        return BindingBuilder.bind(sertanejoQueue).to(headersExchange).whereAll(headerValues).match();
    }

    @Bean
    Binding popBinding(Queue popQueue, HeadersExchange headersExchange) {
        Map<String, Object> headerValues = new HashMap<>();
        headerValues.put("genre", "pop");
        return BindingBuilder.bind(popQueue).to(headersExchange).whereAll(headerValues).match();
    }

    @Bean
    Binding rapBinding(Queue rapQueue, HeadersExchange headersExchange) {
        Map<String, Object> headerValues = new HashMap<>();
        headerValues.put("genre", "rap");
        return BindingBuilder.bind(rapQueue).to(headersExchange).whereAll(headerValues).match();
    }

    @Bean
    Binding conferenceBinding(Queue conferenceQueue, HeadersExchange headersExchange) {
        Map<String, Object> headerValues = new HashMap<>();
        headerValues.put("genre", "conference");
        return BindingBuilder.bind(conferenceQueue).to(headersExchange).whereAll(headerValues).match();
    }

    public static void main(String[] args) {
        ConfigurableApplicationContext context = SpringApplication.run(ConsumerJavaApplication.class, args);
        runMenu();
        createListenerContainer(context);
    }

    private static void createListenerContainer(ConfigurableApplicationContext context) {
        ConnectionFactory connectionFactory = context.getBean(ConnectionFactory.class);
        MessageListenerAdapter listenerAdapter = context.getBean(MessageListenerAdapter.class);
        SimpleMessageListenerContainer container = new SimpleMessageListenerContainer();
        container.setConnectionFactory(connectionFactory);

        // Configura o consumidor para escutar todas as filas selecionadas
        container.setQueueNames(chosenQueues.toArray(new String[0]));
        container.setMessageListener(listenerAdapter);
        container.start();
    }

    private static void runMenu() {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Choose:");
        System.out.println("1 - Rock");
        System.out.println("2 - Culture");
        System.out.println("3 - Convention");
        System.out.println("4 - Sertanejo");
        System.out.println("5 - Pop");
        System.out.println("6 - Rap");
        System.out.println("7 - Conference");

        String input = scanner.nextLine();
        String[] tipos = input.split(",");

        for (String tipo : tipos) {
            String queueName = getQueueNameByType(Integer.parseInt(tipo.trim()));
            if (queueName != null) {
                chosenQueues.add(queueName);
            } 
            else {
                System.out.println("Invalid Option: " + tipo);
            }
        }

        scanner.close();
    }

    public static String getQueueNameByType(int tipo) {
        switch (tipo) {
            case 1:
                return rockQueue;
            case 2:
                return cultureQueue;
            case 3:
                return conventionQueue;
            case 4:
                return sertanejoQueue;
            case 5:
                return popQueue;
            case 6:
                return rapQueue;
            case 7:
                return conferenceQueue;
            default:
                return null;
        }
    }

    @Bean
    MessageListenerAdapter listenerAdapter(Receiver receiver) {
        return new MessageListenerAdapter(receiver, "receiveMessage");
    }
}
