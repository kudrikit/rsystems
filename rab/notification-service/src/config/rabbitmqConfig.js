const amqp = require('amqplib');

async function createChannel() {
  const connection = await amqp.connect(process.env.RABBITMQ_URL);
  return connection.createChannel();
}

module.exports = { createChannel };
