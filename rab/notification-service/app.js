const { listenForOrders } = require('./src/listeners/orderNotificationListener');

listenForOrders().then(() => {
  console.log(`Notification Service for region ${process.env.REGION} is running`);
});
