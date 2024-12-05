const createConnection = require('../config/rabbitmq');

async function publishOrder(order) {
  const channel = await createConnection();
  const exchangeName = 'order-topic-exchange';

  await channel.assertExchange(exchangeName, 'topic', { durable: true });

  const routingKey = `order.${order.region}`;
  channel.publish(exchangeName, routingKey, Buffer.from(JSON.stringify(order)));
  console.log(`Order published to region: ${order.region}`);
}

module.exports = publishOrder;
