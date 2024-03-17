import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { Restaurant } from "./restaurant.entity";
import { RestaurantService } from "./restaurant.service";
import { JwtAuthGuard } from "../auth/jwt-guard";

@Controller("restaurant")
export class RestaurantController {
  constructor(private resService: RestaurantService) {}

  @Post()
  @UseGuards(new JwtAuthGuard(["BUSINESS_OWNER_ACCESS", "ADMIN_ACCESS"]))
  async addResturant(@Body() restaurant: Restaurant) {
    console.log(restaurant);
    return this.resService.createRestaurant(restaurant);
  }

  @Get()
  @UseGuards(
    new JwtAuthGuard(["BUSINESS_OWNER_ACCESS", "ADMIN_ACCESS", "USER_ACCESS"])
  )
  async getResturant() {
    return this.resService.getAllRestaurants();
  }

  @Get("/:id")
  @UseGuards(
    new JwtAuthGuard(["BUSINESS_OWNER_ACCESS", "ADMIN_ACCESS", "USER_ACCESS"])
  )
  async getResturantbyId(@Param("id") id: number) {
    return this.resService.getRestaurantById(id);
  }

  @Put("/:id")
  @UseGuards(new JwtAuthGuard(["BUSINESS_OWNER_ACCESS", "ADMIN_ACCESS"]))
  async updateResturant(
    @Param("id") id: number,
    @Body() restaurant: Restaurant
  ) {
    return this.resService.updateRestaurant(id, restaurant);
  }

  @Delete("/:id")
  @UseGuards(new JwtAuthGuard(["ADMIN_ACCESS"]))
  async deleteResturant(@Param("id") id: number) {
    return this.resService.deleteRestaurant(id);
  }
}
