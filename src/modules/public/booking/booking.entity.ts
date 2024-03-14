import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { User } from "../user/user.entity";
import { Restaurant } from "../restaurant/restaurant.entity";

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  booking_id: number;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.bookings)
  restaurant: Restaurant;

  @ManyToOne(() => User, (user) => user.bookings)
  user: User;

  @Column("date")
  booking_date: Date;

  @Column("time")
  booking_time: string;

  @Column()
  number_of_guests: number;
}
