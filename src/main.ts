import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import "reflect-metadata";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe());
	const options = new DocumentBuilder()
		.setTitle('Books API')
		.setDescription('The books API description')
		.setVersion('1.0')
		.addTag('book')
		.addTag('genre')
		.addTag('user')
		.build();
	const document = SwaggerModule.createDocument(app, options);
	SwaggerModule.setup('api', app, document);
	await app.listen(3000);
}
bootstrap();