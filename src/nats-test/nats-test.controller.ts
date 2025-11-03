import { Controller, Post, Body } from '@nestjs/common';
import { NatsTestService } from './nats-test.service';

@Controller('nats-test')
export class NatsTestController {
  constructor(private readonly service: NatsTestService) {}

  @Post()
  async send(@Body() body: any) {
    const response: unknown = await this.service.sendMessage(body);
    return { status: 'sent', response };
  }
}
