import React, { useState } from 'react';
import axios from 'axios';

function OrderForm() {
  const [restaurant, setRestaurant] = useState('');
  const [courier, setCourier] = useState('');
  const [foods, setFoods] = useState('');
  const [status, setStatus] = useState('New');
  const [region, setRegion] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const order = { restaurant, courier, foods: foods.split(','), status, region };
    await axios.post('http://localhost:3000/order', order);
    alert('Order sent successfully');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={restaurant} onChange={(e) => setRestaurant(e.target.value)} placeholder="Restaurant" />
      <input value={courier} onChange={(e) => setCourier(e.target.value)} placeholder="Courier" />
      <input value={foods} onChange={(e) => setFoods(e.target.value)} placeholder="Foods (comma separated)" />
      <input value={region} onChange={(e) => setRegion(e.target.value)} placeholder="Region" />
      <button type="submit">Send Order</button>
    </form>
  );
}

export default OrderForm;
