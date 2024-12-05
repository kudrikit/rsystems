const express = require('express');
const orderController = require('./controllers/orderController');

const app = express();
app.use(express.json());
app.use('/api', orderController);

app.listen(3000, () => console.log('Order Service running on port 3000'));
