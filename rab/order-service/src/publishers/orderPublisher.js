const { createChannel } = require('../config/rabbitmqConfig');

async function publishOrder(order, region) {
  const channel = await createChannel();
  const exchange = 'order-topic-exchange';
  await channel.assertExchange(exchange, 'topic', { durable: false });
  const routingKey = `order.${region}`;
  channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(order)));
  console.log(`Order published to region: ${region}`);
}

module.exports = { publishOrder };
