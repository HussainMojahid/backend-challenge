import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { PasswordTransformer } from "./password.transformer";

@Entity()
export class User {
  [x: string]: any;
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  email?: string;

  @Column({
    transformer: new PasswordTransformer(),
  })
  password?: string;

  @Column()
  role: string = "USER_ACCESS";
}

export class UserFillableFields {
  email: string;
  username: string;
  password: string;
  role: string = "USER_ACCESS";
}
