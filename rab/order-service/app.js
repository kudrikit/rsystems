const express = require('express');
const bodyParser = require('body-parser');
const { createOrder } = require('./src/controllers/orderController');

const app = express();
app.use(bodyParser.json());

app.post('/order', createOrder);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Order Service running on port ${PORT}`);
});
