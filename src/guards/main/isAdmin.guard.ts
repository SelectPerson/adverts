import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { userRoleTypes } from '../../types/User/User';

@Injectable()
export class isAdminGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({
          message: 'User not auth',
        });
      }

      const user = this.jwtService.verify(token);
      req.user = user;
      console.log('req.user.role', user.user.role);
      return user.user.role === userRoleTypes.ADMIN;
    } catch (e) {
      throw new UnauthorizedException({
        message: 'User not auth',
      });
    }
  }
}
