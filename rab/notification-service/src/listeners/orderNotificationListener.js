const { createChannel } = require('../config/rabbitmqConfig');

async function listenForOrders() {
  const channel = await createChannel();
  const exchange = 'order-topic-exchange';
  await channel.assertExchange(exchange, 'topic', { durable: false });
  const queue = `order-queue-${process.env.REGION}`;
  await channel.assertQueue(queue);
  await channel.bindQueue(queue, exchange, `order.${process.env.REGION}`);
  channel.consume(queue, (msg) => {
    console.log(`Received order in ${process.env.REGION}:`, msg.content.toString());
    channel.ack(msg);
  });
}

module.exports = { listenForOrders };
