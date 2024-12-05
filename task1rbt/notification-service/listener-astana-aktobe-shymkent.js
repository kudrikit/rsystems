const amqplib = require('amqplib');

const RABBITMQ_URL = 'amqp://user:password@localhost:5672';
const EXCHANGE_NAME = 'order-topic-exchange';
const QUEUE_NAME = 'astana-aktobe-shymkent-queue';
const ROUTING_KEYS = ['order.astana', 'order.aktobe', 'order.shymkent'];

(async () => {
  const connection = await amqplib.connect(RABBITMQ_URL);
  const channel = await connection.createChannel();

  await channel.assertExchange(EXCHANGE_NAME, 'topic', { durable: false });
  await channel.assertQueue(QUEUE_NAME, { durable: false });

  for (const key of ROUTING_KEYS) {
    await channel.bindQueue(QUEUE_NAME, EXCHANGE_NAME, key);
  }

  console.log(`Listening for messages on ${QUEUE_NAME}...`);
  channel.consume(QUEUE_NAME, (msg) => {
    console.log(`Received message: ${msg.content.toString()}`);
    channel.ack(msg);
  });
})();
