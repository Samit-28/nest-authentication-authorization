import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { NatsConsumerService } from './nats-consumer.service';

@Controller()
export class NatsConsumerController {
  constructor(private readonly service: NatsConsumerService) {}

  @MessagePattern('nats-test')
  handle(data: any) {
    return this.service.handleMessage(data);
  }
}
