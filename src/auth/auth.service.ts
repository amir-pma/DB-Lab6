import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthService {
	constructor(private userService: UserService, private jwtService: JwtService) {}

	async validateUser(username: string, pass: string): Promise<any> {
		const user = await this.userService.findByUserName(username);
		if (user && (await compare(pass, user.password))) {
			const { password, ...result } = user;
			return result;
		}
		return null;
	}
	
	async login(user: any) {
		console.log(user);
		const payload = { username: user.username, sub: user.id };
		console.log(payload);

		return {
			access_token: this.jwtService.sign(payload),
		};
	}
}