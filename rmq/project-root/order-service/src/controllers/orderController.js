const express = require('express');
const publishOrder = require('../services/orderPublisher');
const OrderDTO = require('../models/orderDTO');

const router = express.Router();

router.post('/order', async (req, res) => {
  const { restaurant, courier, foods, status, region } = req.body;
  const order = new OrderDTO(restaurant, courier, foods, status, region);

  try {
    await publishOrder(order);
    res.status(200).send('Order published successfully');
  } catch (error) {
    res.status(500).send('Error publishing order');
  }
});

module.exports = router;
