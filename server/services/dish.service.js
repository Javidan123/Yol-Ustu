import Dish from "../models/Dish.js";
import dishValidation from "../validations/dishValidation.js";

class DishService {
  async getMenu() {
    const dishes = await Dish.find({});
    if (dishes.length === 0) {
      throw new Error("Menu is empty");
    }
    return dishes;
  }

  async getDishById(id) {
    const dish = await Dish.findById(id);
    if (!dish) {
      throw new Error("Dish not found");
    }
    return dish;
  }

  async createDish(data) {
    const parsed = dishValidation.parse(data);

    const newDish = new Dish(parsed);
    await newDish.save();

    return newDish;
  }

  async updateDish(id, data) {
    const parsed = dishValidation.parse(data);

    const dish = await Dish.findByIdAndUpdate(
      id,
      parsed,
      { new: true, runValidators: true, returnDocument: "after" }
    );

    if (!dish) {
      throw new Error("Dish not found");
    }

    return dish;
  }

  async deleteDish(id) {
    const dish = await Dish.findByIdAndDelete(id);

    if (!dish) {
      throw new Error("Dish not found");
    }

    return dish;
  }
}

export default new DishService();