import { NestFactory } from '@nestjs/core';
import { NatsConsumerModule } from './nats-consumer/nats-consumer.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(NatsConsumerModule, {
    transport: Transport.TCP,
    options: { host: '127.0.0.1', port: 8877 },
  });

  await app.listen();
  console.log('✅ NATS consumer running');
}
void bootstrap();
