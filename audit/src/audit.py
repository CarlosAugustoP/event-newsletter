import pika

def audit_message_callback(ch, method, properties, body):
    message = body.decode()
    print(f"[AUDIT] Message Received: {message}")
    print(f"  - Metadata Exchange: {method.exchange}")

def main():
    # Connect to RabbitMQ
    connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
    channel = connection.channel()

    # Declare the audit queue
    audit_queue_name = 'audit_queue'
    channel.queue_declare(queue=audit_queue_name, durable=True)

    # Bind the audit queue to each exchange
    exchanges = [
        'concert_headers_exchange',
        'culture_headers_exchange',
        'convention_headers_exchange',
        'sertanejo_concert_headers_exchange',
        'pop_concert_headers_exchange',
        'rap_concert_headers_exchange',
        'conference_headers_exchange'
    ]

    for exchange in exchanges:
        channel.exchange_declare(exchange=exchange, exchange_type='headers', durable=True)
        channel.queue_bind(exchange=exchange, queue=audit_queue_name)

    print('[AUDIT] Waiting for messages on all exchanges. Press CTRL+C to exit.')

    # Start consuming messages
    channel.basic_consume(queue=audit_queue_name, on_message_callback=audit_message_callback, auto_ack=True)
    channel.start_consuming()

if __name__ == "__main__":
    main()
