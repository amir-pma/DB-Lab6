import { Injectable } from '@nestjs/common';
import  UserService  from '../user/user.service';
import { hashSync } from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user && user.password === hashSync(pass, 10)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}