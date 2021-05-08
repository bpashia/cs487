import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { ProviderToken } from '../api-lib.constants';
import { CustomerService } from './customer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from '../entities';

const providers = [
  {
    provide: ProviderToken.CustomerService,
    useClass: CustomerService,
  },
];
@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  controllers: [CustomerController],
  providers,
  exports: providers,
})
export class CustomerModule {}
