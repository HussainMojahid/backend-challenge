import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { log } from "console";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  constructor(private readonly requiredRole: string[]) {
    super();
  }
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    if (info) {
      return user;
    }
    log(user);
    if (!this.requiredRole.includes(user.role)) {
      throw new UnauthorizedException(
        "You do not have permission to access this resource"
      );
    }
    return user;
  }
}
