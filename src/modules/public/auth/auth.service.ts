import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "../user/user.entity";
import { UserService } from "../user/user.service";
import { LoginPayload } from "./login.payload";
import { Hash } from "src/utils/Hash";
import { info } from "console";
import { BUSINESS_OWNER_ACCESS_LEVELS } from "src/constants/privilages-business-owner";
import { ADMIN_ACCESS_LEVELS } from "src/constants/privileges-admin";
import { USER_ACCESS_LEVELS } from "src/constants/privilages-user";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {}

  /**
   * Description: This method is used to generate the token for the logged in user.
   * @description This method is used to generate the token for the logged in user.
   * @param user object of User
   * @return user object with token info
   */
  async createToken(user: User) {
    let permissions = {};
    switch (user.role) {
      case "BUSINESS_OWNER_ACCESS":
        permissions = BUSINESS_OWNER_ACCESS_LEVELS;
        break;
      case "ADMIN_ACCESS":
        permissions = ADMIN_ACCESS_LEVELS;
        break;
      case "USER_ACCESS":
        permissions = USER_ACCESS_LEVELS;
      default:
        break;
    }
    return {
      expiresIn: process.env.APPSETTING_JWT_EXPIRATION_TIME,
      accessToken: this.jwtService.sign({
        username: user.username,
        sub: user.user_id,
      }),
      permissions: permissions,
      user,
    };
  }

  async validateUser(payload: LoginPayload): Promise<any> {
    info(
      "Validatig the user username :" + payload.username,
      __filename,
      "validateUser()"
    );
    const user: any = await this.userService.getByUserName(payload.username);
    console.log(user);
    if (
      !user ||
      user.password == null ||
      !Hash.compare(payload.password, user.password)
    ) {
      throw new UnauthorizedException("Invalid credentials!");
    }
    delete user.password;
    return user;
  }
}
