const express = require('express');
const { listenForOrders } = require('./listeners/orderNotificationListener');

const app = express();
const region = 'almaty';

  listenForOrders(region);


const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Notification Service running on port ${PORT}`);
});
