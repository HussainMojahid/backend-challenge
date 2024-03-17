import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { User } from "../user/user.entity";

@Entity()
export class Restaurant {
  [x: string]: any;
  @PrimaryGeneratedColumn()
  restaurant_id: number;

  @ManyToOne(() => User, (user) => user.restaurants, {
    cascade: true,
    onDelete: "CASCADE",
  })
  user: User;

  @Column()
  restaurant_name: string;

  @Column()
  address: string;

  @Column({ nullable: true })
  contact_number: string;

  @Column("text", { nullable: true })
  description: string;

  @Column({ nullable: true })
  image_url: string;
}
