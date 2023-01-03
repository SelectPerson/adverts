import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [],
  controllers: [ProfileController],
  imports: [AuthModule],
})
export class ProfileModule {}
