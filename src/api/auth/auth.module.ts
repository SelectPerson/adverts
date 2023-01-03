import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { RtStrategy, AtStrategy } from './strategies';
import { TokensModule } from '../tokens/tokens.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AtStrategy, RtStrategy],
  imports: [
    PassportModule,
    TokensModule,
    forwardRef(() => UsersModule),
    JwtModule.register({}),
  ],
  exports: [AuthService],
})
export class AuthModule {}
