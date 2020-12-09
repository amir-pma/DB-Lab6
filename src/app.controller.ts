import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import {ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';


@Controller()
export class AppController {
	constructor(private authService: AuthService) {}

	@ApiResponse({ status: 200, description: "Logs the new user in and generates token" })
	@UseGuards(LocalAuthGuard)
	@Post('auth/login')
	async login(@Request() req) {
		return this.authService.login(req.user);
	}
}