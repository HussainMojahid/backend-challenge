import { Module } from "@nestjs/common";
import { UserReviewService } from "./review.service";
import { UserService } from "../user/user.service";
import { Restaurant } from "../restaurant/restaurant.entity";
import { RestaurantService } from "../restaurant/restaurant.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserReview } from "./user-review.entity";
import { UserReviewController } from "./user-review.controller";
import { User } from "../user/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([UserReview, Restaurant, User])],
  controllers: [UserReviewController],
  providers: [UserReviewService, UserService, RestaurantService],
})
export class ReviewModule {}
