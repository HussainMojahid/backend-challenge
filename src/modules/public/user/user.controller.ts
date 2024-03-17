import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { User } from "./user.entity";
import { UserService } from "./user.service";
import { AddUserPayload } from "./add-user.payload";

@Controller("api/user")
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async addUser(@Body() payload: AddUserPayload): Promise<any> {
    const user = await this.userService.addUser(payload);
    return user;
  }

  @Get("/:id")
  async getbyUser(@Param("id") id: number): Promise<User> {
    return await this.userService.getById(id);
  }
}
