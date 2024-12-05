const amqplib = require('amqplib');
require('dotenv').config();

async function createConnection() {
  const connection = await amqplib.connect(process.env.RABBITMQ_URL);
  return connection.createChannel();
}

module.exports = createConnection;
