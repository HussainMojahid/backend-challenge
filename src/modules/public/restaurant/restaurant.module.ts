import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Restaurant } from "./restaurant.entity";
import { MenuItem } from "./menu-item.entity";
import { UserReview } from "./user-review.entity";
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, MenuItem, UserReview])],
  controllers: [RestaurantController],
  providers: [RestaurantService],
})
export class RestaurantModule {}
