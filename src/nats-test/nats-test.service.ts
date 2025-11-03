import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class NatsTestService {
  constructor(@Inject('NATS_SERVICE') private client: ClientProxy) {}

  async sendMessage(data: unknown): Promise<unknown> {
    // Send message and wait for a response
    return await firstValueFrom(this.client.send('nats-test', data));
  }
}
