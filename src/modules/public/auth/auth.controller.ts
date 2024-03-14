import { Controller, Get } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get()
  async getHello(): Promise<any> {
    return await this.authService.createToken({
      user_id: 1,
      role: "USER",
      username: "Mojaid",
    });
  }
}
