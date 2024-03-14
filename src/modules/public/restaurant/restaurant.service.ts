import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../user/user.entity";
import { Restaurant } from "./restaurant.entity";

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(User)
    private readonly restaurantRepository: Repository<Restaurant>
  ) {}

  async createRestaurant(
    restaurantData: Partial<Restaurant>
  ): Promise<Restaurant> {
    const newRestaurant = this.restaurantRepository.create(restaurantData);
    return await this.restaurantRepository.save(newRestaurant);
  }

  async getAllRestaurants(): Promise<Restaurant[]> {
    return await this.restaurantRepository.find();
  }

  async getRestaurantById(
    restaurantId: number
  ): Promise<Restaurant | undefined> {
    return await this.restaurantRepository.findOneBy({
      restaurant_id: restaurantId,
    });
  }

  async updateRestaurant(
    restaurantId: number,
    updatedRestaurantData: Partial<Restaurant>
  ): Promise<Restaurant | undefined> {
    await this.restaurantRepository.update(restaurantId, updatedRestaurantData);
    return await this.restaurantRepository.findOneBy({
      restaurant_id: restaurantId,
    });
  }

  async deleteRestaurant(restaurantId: number): Promise<boolean> {
    const deleteResult = await this.restaurantRepository.delete(restaurantId);
    return !!deleteResult.affected;
  }
}
