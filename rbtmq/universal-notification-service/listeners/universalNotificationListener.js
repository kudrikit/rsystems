const { connectToRabbitMQ } = require('../config/rabbitmq');

async function listenForCityOrders() {
  const connection = await connectToRabbitMQ();
  const channel = await connection.createChannel();
  const exchange = 'order-topic-exchange';
  const queue = 'order-queue-cities';

  await channel.assertExchange(exchange, 'topic', { durable: false });
  await channel.assertQueue(queue, { durable: false });

  console.log(`Listening for messages on queue: ${queue}`);

  channel.consume(
    queue,
    (msg) => {
      if (msg) {
        const order = JSON.parse(msg.content.toString());
        console.log('Received order:', order);
        channel.ack(msg);
      }
    },
    { noAck: false }
  );
}


module.exports = { listenForCityOrders };
