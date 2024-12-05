const express = require('express');
const cors = require('cors'); // Импорт библиотеки cors
const orderRoutes = require('./routes/orderRoutes');

const app = express();

app.use(cors()); // Включите CORS
app.use(express.json());
app.use('/api', orderRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Order Service running on port ${PORT}`);
});
