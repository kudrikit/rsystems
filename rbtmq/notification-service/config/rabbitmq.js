const amqp = require('amqplib');

async function connectToRabbitMQ() {
  try {
    const connection = await amqp.connect('amqp://admin:password@localhost');
    console.log('Connected to RabbitMQ successfully');
    return connection;
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error);
  }
}

module.exports = { connectToRabbitMQ };
