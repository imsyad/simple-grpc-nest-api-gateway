import { Module } from '@nestjs/common';
import { ProtousersController } from './protousers.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USERPROTO_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50052',
          package: ['userproto', 'credentialproto'],
          protoPath: [
            join(__dirname, '../../proto/user/user.proto'),
            join(__dirname, '../../proto/credential/credential.proto'),
          ],
        },
      },
    ]),
  ],
  controllers: [ProtousersController],
})
export class ProtousersModule {}
