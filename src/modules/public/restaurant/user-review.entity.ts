import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { User } from "../user/user.entity";
import { Restaurant } from "./restaurant.entity";

@Entity()
export class UserReview {
  @PrimaryGeneratedColumn()
  review_id: number;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.userReviews)
  restaurant: Restaurant;

  @ManyToOne(() => User, (user) => user.reviews)
  user: User;

  @Column("text")
  review_text: string;

  @Column()
  rating: number;
}
