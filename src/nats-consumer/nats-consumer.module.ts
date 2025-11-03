import { Module } from '@nestjs/common';
import { NatsConsumerController } from './nats-consumer.controller';
import { NatsConsumerService } from './nats-consumer.service';

@Module({
  controllers: [NatsConsumerController],
  providers: [NatsConsumerService],
})
export class NatsConsumerModule {}
