const OrderDTO = require('../models/orderDTO');
const { publishOrder } = require('../publishers/orderPublisher');

async function createOrder(req, res) {
  const { restaurant, courier, foods, status, region } = req.body;
  const order = new OrderDTO(restaurant, courier, foods, status);
  await publishOrder(order, region);
  res.status(201).send('Order created and published successfully');
}

module.exports = { createOrder };
