const amqplib = require('amqplib');

const RABBITMQ_URL = 'amqp://user:password@localhost:5672';
const EXCHANGE_NAME = 'order-topic-exchange';
const QUEUE_NAME = 'almaty-queue';
const ROUTING_KEY = 'order.almaty';

(async () => {
  const connection = await amqplib.connect(RABBITMQ_URL);
  const channel = await connection.createChannel();

  await channel.assertExchange(EXCHANGE_NAME, 'topic', { durable: false });
  await channel.assertQueue(QUEUE_NAME, { durable: false });
  await channel.bindQueue(QUEUE_NAME, EXCHANGE_NAME, ROUTING_KEY);

  console.log(`Listening for messages on ${QUEUE_NAME}...`);
  channel.consume(QUEUE_NAME, (msg) => {
    console.log(`Received message: ${msg.content.toString()}`);
    channel.ack(msg);
  });
})();
