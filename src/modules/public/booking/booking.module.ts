import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Booking } from "./booking.entity";
import { BookingController } from "./booking.controller";
import { BookingService } from "./booking.service";
import { Restaurant } from "../restaurant/restaurant.entity";
import { RestaurantService } from "../restaurant/restaurant.service";
import { User } from "../user/user.entity";

import { UserService } from "../user/user.service";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "../auth/jwt.strategy";

@Module({
  imports: [
    TypeOrmModule.forFeature([Booking, Restaurant, User]),
    PassportModule.register({ defaultStrategy: "jwt" }),
  ],
  controllers: [BookingController],
  providers: [BookingService, RestaurantService, UserService, JwtStrategy],
})
export class BookingModule {}
