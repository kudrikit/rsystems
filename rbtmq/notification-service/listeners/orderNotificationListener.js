const { connectToRabbitMQ } = require('../config/rabbitmq');

async function listenForOrders(almaty) {
  const connection = await connectToRabbitMQ();
  const channel = await connection.createChannel();
  const exchange = 'order-topic-exchange';
  const queue = `order-queue-almaty`;

  await channel.assertExchange(exchange, 'topic', { durable: false });
  await channel.assertQueue(queue, { durable: false });
  await channel.bindQueue(queue, exchange, `order.almaty`);

  channel.consume(queue, (msg) => {
    if (msg) {
      const order = JSON.parse(msg.content.toString());
      console.log(`Received order for region almaty:`, order);
      channel.ack(msg);
    }
  }, { noAck: false });

  console.log(`Listening for orders in region: almaty`);
}

module.exports = { listenForOrders };
