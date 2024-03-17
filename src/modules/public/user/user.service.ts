import { Injectable, NotAcceptableException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User, UserFillableFields } from "./user.entity";
import { Repository } from "typeorm";
import { debug, error, info, log } from "console";
import { AddUserPayload } from "./add-user.payload";
import { JwtService } from "@nestjs/jwt";

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

  async getByUserName(username: string) {
    info(
      "Getting user information by user by usename :" + username,
      __filename,
      "getByUserName()"
    );
    try {
      return await this.userRepository
        .createQueryBuilder("users")
        .addSelect("users.username")
        .where("users.username = :username")
        .setParameter("username", username)
        .getOne();
    } catch (er) {
      error(
        "Getting error in find user by  username " + username,
        __filename,
        "getByUserName()"
      );
    }
  }

  async addUser(payload: UserFillableFields) {
    debug(
      "Adding a new biolabs user" + payload.username,
      __filename,
      "addUser()"
    );
    let savedUser: any = null;
    try {
      const user = await this.getByUserName(payload.username);
      if (user) {
        debug(
          "User with provided username already created",
          __filename,
          "addUser()"
        );
        return new NotAcceptableException(
          "User with provided username already created."
        );
      }
      log(payload);
      if (["USER_ACCESS", "BUSINESS_OWNER_ACCESS"].includes(payload.role)) {
        const newUser = this.userRepository.create(payload);
        savedUser = await this.userRepository.save(newUser);

        info("User added successfully", __filename, "addUser(");
      } else if (payload.role == "ADMIN_ACCESS") {
        return new NotAcceptableException(
          "Contact Authorities for Admins Right."
        );
      } else {
        return new NotAcceptableException("Please Selecet Right Role");
      }
    } catch (err) {
      error(
        "Getting error to create the new user " + err.message,
        __filename,
        "addUser()"
      );
    }
    return savedUser;
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
