const express = require('express');
const bodyParser = require('body-parser');
const amqplib = require('amqplib');
const cors = require('cors');


const app = express();
app.use(bodyParser.json());
app.use(cors());

const RABBITMQ_URL = 'amqp://user:password@localhost:5672';
const EXCHANGE_NAME = 'order-topic-exchange';

let channel;

(async () => {
  const connection = await amqplib.connect(RABBITMQ_URL);
  channel = await connection.createChannel();
  await channel.assertExchange(EXCHANGE_NAME, 'topic', { durable: false });
})();

app.post('/order', async (req, res) => {
  const { region, restaurant, courier, foods, status } = req.body;

  if (!region || !restaurant || !courier || !foods || !status) {
    return res.status(400).send('Invalid order data.');
  }

  const order = { restaurant, courier, foods, status };
  const routingKey = `order.${region}`;

  channel.publish(EXCHANGE_NAME, routingKey, Buffer.from(JSON.stringify(order)));
  console.log(`Order sent: ${JSON.stringify(order)} to ${routingKey}`);
  res.status(200).send('Order sent.');
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Order Service running on http://localhost:${PORT}`));
