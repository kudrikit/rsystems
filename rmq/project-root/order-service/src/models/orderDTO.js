class OrderDTO {
  constructor(restaurant, courier, foods, status, region) {
    this.restaurant = restaurant;
    this.courier = courier;
    this.foods = foods;
    this.status = status;
    this.region = region;
  }
}

module.exports = OrderDTO;
