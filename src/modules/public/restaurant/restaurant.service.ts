import { BadRequestException, HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../user/user.entity";
import { Restaurant } from "./restaurant.entity";
import { UserService } from "../user/user.service";
import { error } from "console";

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
    private readonly userService: UserService
  ) {}

  async createRestaurant(
    restaurantData: Partial<Restaurant>
  ): Promise<Restaurant | HttpException> {
    let user: User = await this.userService.getById(
      restaurantData.user as unknown as number
    );
    if (user != null) {
      restaurantData.user = user;
    } else {
      error(
        "User not forund with ID:",
        restaurantData.user as unknown as number
      );
      return new BadRequestException("User Not Found");
    }
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

  async deleteRestaurant(
    restaurantId: number
  ): Promise<boolean | HttpException> {
    const restaurant = await this.getRestaurantById(restaurantId);
    if (restaurant != null) {
      const deleteResult = await this.restaurantRepository.delete(restaurantId);
      return !!deleteResult.affected;
    } else {
      return new BadRequestException(
        "restaurant not found with this id: " + restaurantId
      );
    }
  }
}
