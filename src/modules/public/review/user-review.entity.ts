import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { User } from "../user/user.entity";
import { Restaurant } from "../restaurant/restaurant.entity";

@Entity()
export class UserReview {
  @PrimaryGeneratedColumn()
  review_id: number;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.userReviews)
  restaurant: Restaurant;

  @ManyToOne(() => User, (user) => user.reviews, {
    cascade: true,
    onDelete: "CASCADE",
  })
  user: User;

  @Column("text")
  review_text: string;

  @Column({ nullable: true })
  rating: number;

  @OneToMany(() => UserReview, (review) => review.parentReview)
  @JoinColumn({ name: "parent_review_id" })
  replies: UserReview[];

  @ManyToOne(() => UserReview, (review) => review.replies, {
    nullable: true,
    cascade: true,
    onDelete: "CASCADE",
  })
  parentReview: UserReview;
}
