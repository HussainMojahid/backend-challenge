import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Restaurant } from "./restaurant.entity";
import { MenuItem } from "./menu-item.entity";
import { UserReview } from "../review/user-review.entity";
import { RestaurantController } from "./restaurant.controller";
import { RestaurantService } from "./restaurant.service";
import { UserService } from "../user/user.service";
import { UserModule } from "../user/user.module";
import { User } from "../user/user.entity";
import { PassportModule } from "@nestjs/passport";
import { JwtService } from "@nestjs/jwt";
import { JwtStrategy } from "../auth/jwt.strategy";

@Module({
  imports: [
    TypeOrmModule.forFeature([Restaurant, MenuItem, UserReview, User]),
    PassportModule.register({ defaultStrategy: "jwt" }),
  ],
  controllers: [RestaurantController],
  providers: [RestaurantService, UserService, JwtStrategy],
  exports: [RestaurantService],
})
export class RestaurantModule {}
