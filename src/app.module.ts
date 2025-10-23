import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeeModule } from './coffee/coffee.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [CoffeeModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
