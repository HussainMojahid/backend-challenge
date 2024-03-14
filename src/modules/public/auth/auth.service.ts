import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "../user/user.entity";

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  /**
   * Description: This method is used to generate the token for the logged in user.
   * @description This method is used to generate the token for the logged in user.
   * @param user object of User
   * @return user object with token info
   */
  createToken(user: User) {
    let permissions = {};

    return {
      expiresIn: process.env.APPSETTING_JWT_EXPIRATION_TIME,
      accessToken: this.jwtService.sign({ id: user.user_id }),
      user,
    };
  }
}
