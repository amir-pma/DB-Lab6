import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { UserModule } from '../user/user.module';
import UserService from 'src/User/user.service';

@Module({
  imports: [UserModule, PassportModule],
  providers: [AuthService, LocalStrategy, UserService],
})
export class AuthModule {}
