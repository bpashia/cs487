import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { ProviderToken } from '../api-lib.constants';
import { AddressService } from './address.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from '../entities';

const providers = [
  {
    provide: ProviderToken.AddressService,
    useClass: AddressService,
  },
];
@Module({
  imports: [TypeOrmModule.forFeature([Address])],
  controllers: [AddressController],
  providers,
  exports: providers,
})
export class AddressModule {}
