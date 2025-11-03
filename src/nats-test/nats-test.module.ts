import { Module } from '@nestjs/common';
import { NatsTestController } from './nats-test.controller';
import { NatsTestService } from './nats-test.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NATS_SERVICE',
        transport: Transport.TCP,
        options: { host: '127.0.0.1', port: 8877 },
      },
    ]),
  ],
  controllers: [NatsTestController],
  providers: [NatsTestService],
})
export class NatsTestModule {}
