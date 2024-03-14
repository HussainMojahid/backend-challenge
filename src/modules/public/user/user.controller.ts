import { Controller, Get, Param } from "@nestjs/common";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@Controller("api/user")
export class UserController {
  constructor(private userService: UserService) {}

  @Get("/:id")
  async getbyUser(@Param("id") id: number): Promise<User> {
    return await this.userService.getById(id);
  }
}
