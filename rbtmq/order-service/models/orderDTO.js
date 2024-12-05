class OrderDTO {
  constructor(restaurant, courier, foods, status) {
    this.restaurant = restaurant;
    this.courier = courier;
    this.foods = foods;
    this.status = status;
  }
}

module.exports = OrderDTO;
