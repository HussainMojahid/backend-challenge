import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { Restaurant } from "./restaurant.entity";

@Entity()
export class MenuItem {
  @PrimaryGeneratedColumn()
  item_id: number;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.menuItems)
  restaurant: Restaurant;

  @Column()
  item_name: string;

  @Column("text", { nullable: true })
  description: string;

  @Column("decimal", { precision: 10, scale: 2 })
  price: number;
}
