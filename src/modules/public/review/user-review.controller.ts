import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Patch,
  UseGuards,
} from "@nestjs/common";
import { UserReviewService } from "./review.service";
import { CreateUserReviewDto } from "./create-review.dto";
import { JwtAuthGuard } from "../auth/jwt-guard";

@Controller("user-reviews")
export class UserReviewController {
  constructor(private readonly ReviewService: UserReviewService) {}

  @Get()
  @UseGuards(
    new JwtAuthGuard(["BUSINESS_OWNER_ACCESS", "ADMIN_ACCESS", "USER_ACCESS"])
  )
  async findAll() {
    return this.ReviewService.findAll();
  }

  @Get(":id")
  @UseGuards(
    new JwtAuthGuard(["BUSINESS_OWNER_ACCESS", "ADMIN_ACCESS", "USER_ACCESS"])
  )
  async findOne(@Param("id") id: string) {
    return this.ReviewService.findOne(+id);
  }

  @Get("by-restaurant")
  @UseGuards(
    new JwtAuthGuard(["BUSINESS_OWNER_ACCESS", "ADMIN_ACCESS", "USER_ACCESS"])
  )
  async findByRestaurant(@Query("restaurantId") restaurantId: number) {
    return this.ReviewService.findByRestaurant(restaurantId);
  }

  @Post()
  @UseGuards(new JwtAuthGuard(["ADMIN_ACCESS", "USER_ACCESS"]))
  async create(@Body() createUserReviewDto: CreateUserReviewDto) {
    return this.ReviewService.create(createUserReviewDto);
  }

  @Patch(":parentReviewId/reply")
  @UseGuards(
    new JwtAuthGuard(["BUSINESS_OWNER_ACCESS", "ADMIN_ACCESS", "USER_ACCESS"])
  )
  async replyToReview(
    @Param("parentReviewId") parentReviewId: string,
    @Body() createUserReviewDto: CreateUserReviewDto
  ) {
    return this.ReviewService.replyToReview(
      +parentReviewId,
      createUserReviewDto
    );
  }

  @Delete(":id")
  @UseGuards(new JwtAuthGuard(["ADMIN_ACCESS", "USER_ACCESS"]))
  async remove(@Param("id") id: string) {
    return this.ReviewService.remove(+id);
  }
}
