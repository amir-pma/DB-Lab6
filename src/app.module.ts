import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import BookModule from './book/book.module';
import GenreModule from './genre/genre.module';

@Module({
  imports: [UserModule, BookModule, GenreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
