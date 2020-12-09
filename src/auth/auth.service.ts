import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import UserService from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findByUserName(username);
    if (user && await compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}