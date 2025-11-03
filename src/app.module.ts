import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeeModule } from './coffee/coffee.module';
import { UserModule } from './user/user.module';
import { IdentityaccessModule } from './identityaccess/identityaccess.module';
import { NatsTestModule } from './nats-test/nats-test.module';
import { NatsConsumerModule } from './nats-consumer/nats-consumer.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CoffeeModule,
    UserModule,
    IdentityaccessModule,
    NatsTestModule,
    NatsConsumerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
