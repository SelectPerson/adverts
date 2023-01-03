import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { RtStrategy, AtStrategy } from './strategies';
import { TokensModule } from '../tokens/tokens.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AtStrategy, RtStrategy],
  imports: [
    JwtModule.register({}),
    TokensModule,
    forwardRef(() => UsersModule),
  ],
  exports: [AuthService],
})
export class AuthModule {}
