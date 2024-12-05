const OrderDTO = require('../models/orderDTO');
const { publishOrder } = require('../publishers/orderPublisher');

function createOrder(req, res) {
  const { restaurant, courier, foods, status, region } = req.body;
  const order = new OrderDTO(restaurant, courier, foods, status);

  publishOrder(order, region);
  res.status(201).send({ message: 'Order created and sent' });
}

module.exports = { createOrder };
