const { connectToRabbitMQ } = require('../config/rabbitmq');

async function publishOrder(order, region) {
  const connection = await connectToRabbitMQ();
  const channel = await connection.createChannel();
  const exchange = 'order-topic-exchange';

  await channel.assertExchange(exchange, 'topic', { durable: false });
  const routingKey = `order.${region}`;
  console.log(`Publishing to exchange: ${exchange}, routingKey: ${routingKey}, order:`, order);

  channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(order)));
  console.log(`Order sent successfully to region: ${region}`);

  setTimeout(() => connection.close(), 500);
}


module.exports = { publishOrder };
