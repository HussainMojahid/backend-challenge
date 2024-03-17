import { Module, OnModuleInit } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "../public/auth/auth.module";
import { ConfigModule } from "@nestjs/config";

import { TypeOrmModule } from "@nestjs/typeorm";
import { RestaurantModule } from "../public/restaurant/restaurant.module";
import { BookingModule } from "../public/booking/booking.module";
import { ReviewModule } from "../public/review/review.module";
import { UserService } from "../public/user/user.service";
import { UserModule } from "../public/user/user.module";
@Module({
  imports: [
    AuthModule,
    UserModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "POSTGRES",
      database: "test",
      entities: [__dirname + "./../**/**.entity{.ts,.js}"],
      synchronize: true,
      autoLoadEntities: true,
    }),
    RestaurantModule,
    BookingModule,
    ReviewModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly userService: UserService) {}
  onModuleInit() {
    this.userService.createAdminUser();
  }
}
