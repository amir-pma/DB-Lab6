import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import {ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from './auth/jwt-auth.guard';


@Controller()
export class AppController {
	constructor(private authService: AuthService) {}

	@ApiResponse({ status: 200, description: "Logs the new user in and generates token" })
	@UseGuards(LocalAuthGuard)
	@Post('auth/login')
	async login(@Request() req) {
		return this.authService.login(req.user);
	}

	@ApiResponse({ status: 200, description: "Gets logged in user profile (info)" })
	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Get('profile')
	getProfile(@Request() req) {
		return req.user;
	}
}