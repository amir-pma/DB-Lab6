import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloModule } from './hello/hello.module';
import { BooksModule } from './books/books.module';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';
import { GenreModule } from './genre/genre.module';

@Module({
  imports: [HelloModule, BooksModule, UserModule, BookModule, GenreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
