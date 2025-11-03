import { Injectable } from '@nestjs/common';

@Injectable()
export class NatsConsumerService {
  handleMessage(data: unknown): { ok: true; received: unknown } {
    console.log('Received message:', data);
    return { ok: true, received: data };
  }
}
