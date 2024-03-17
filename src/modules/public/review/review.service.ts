import { Injectable } from "@nestjs/common";
import { UserReview } from "./user-review.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserReviewDto } from "./create-review.dto";
import { RestaurantService } from "../restaurant/restaurant.service";
import { UserService } from "../user/user.service";

@Injectable()
export class UserReviewService {
  constructor(
    @InjectRepository(UserReview)
    private readonly userReviewRepository: Repository<UserReview>,

    private readonly restaurantService: RestaurantService,
    private readonly userService: UserService
  ) {}

  async findAll(): Promise<UserReview[]> {
    return this.userReviewRepository.find();
  }

  async findOne(id: number): Promise<UserReview> {
    return this.userReviewRepository.findOne({
      where: { review_id: id },
      relations: ["replies"],
    });
  }

  async findByRestaurant(restaurantId: number): Promise<UserReview[]> {
    return this.userReviewRepository.find({
      where: { restaurant: { restaurant_id: restaurantId } },
    });
  }

  async create(createUserReviewDto: CreateUserReviewDto): Promise<UserReview> {
    const newUserReview = new UserReview();
    newUserReview.review_text = createUserReviewDto.review_text;
    newUserReview.rating = createUserReviewDto.rating;

    const restaurant = await this.restaurantService.getRestaurantById(
      createUserReviewDto.restaurantId
    );
    if (!restaurant) {
      throw new Error("Restaurant not found");
    }
    newUserReview.restaurant = restaurant;

    const user = await this.userService.getById(createUserReviewDto.userId);
    if (!user) {
      throw new Error("User not found");
    }

    newUserReview.user = user;

    let res = await this.userReviewRepository.save(newUserReview);
    delete res.user;
    return res;
  }

  async replyToReview(
    parentReviewId: number,
    createUserReviewDto: CreateUserReviewDto
  ): Promise<UserReview> {
    const parentReview = await this.userReviewRepository.findOneBy({
      review_id: parentReviewId,
    });
    if (!parentReview) {
      throw new Error("Parent review not found");
    }

    const newReply = new UserReview();
    newReply.review_text = createUserReviewDto.review_text;
    newReply.rating = createUserReviewDto.rating;
    newReply.user = await this.userService.getById(createUserReviewDto.userId);
    newReply.restaurant = await this.restaurantService.getRestaurantById(
      createUserReviewDto.restaurantId
    );
    newReply.parentReview = parentReview;
    delete newReply.user;
    return this.userReviewRepository.save(newReply);
  }

  async remove(id: number): Promise<void> {
    await this.userReviewRepository.delete(id);
  }
}
