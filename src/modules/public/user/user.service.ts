import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { error, info } from "console";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  /**
   * Description: This method is used to get the user information by id.
   * @description This method is used to get the user information by id.
   * @param id number user id.
   * @returns user object.
   */
  async getById(id: number) {
    info("Getting user information by user ID :" + id, __filename, "getById()");
    return this.userRepository.findOneBy({
      user_id: id,
    });
  }

  /**
   * Description: This method is used to get the user information by email.
   * @description This method is used to get the user information by email.
   * @param email string user email.
   * @returns user object
   */
  async getByEmail(email: string) {
    info(
      "Getting user information by user email ID :" + email,
      __filename,
      "getByEmail()"
    );
    try {
      return await this.userRepository
        .createQueryBuilder("users")
        .addSelect("users.email")
        .addSelect("users.password")
        .where("users.email = :email")
        .setParameter("email", email)
        .getOne();
    } catch (er) {
      error(
        "Getting error in find user by email id " + email,
        __filename,
        "getByEmail()"
      );
    }
  }

  async updateUser(
    userId: number,
    updatedUserData: Partial<User>
  ): Promise<User | undefined> {
    info("Updating user information :" + __filename, "getById()");
    await this.userRepository.update(userId, updatedUserData);
    return await this.userRepository.findOneBy({ user: userId });
  }

  async getUsers(): Promise<User[]> {
    info("Getting user information :" + __filename, "getById()");
    return await this.userRepository.find();
  }
}
