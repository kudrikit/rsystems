const express = require('express');
const { listenForCityOrders } = require('./listeners/universalNotificationListener');

const app = express();

listenForCityOrders().catch((error) => {
  console.error('Error starting city orders listener:', error);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Universal Notification Service running on port ${PORT}`);
});
