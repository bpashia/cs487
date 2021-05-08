import { Module } from '@nestjs/common';
import { CreditCardController } from './credit-card.controller';
import { ProviderToken } from '../api-lib.constants';
import { CreditCardService } from './credit-card.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreditCard } from '../entities';

const providers = [
  {
    provide: ProviderToken.CreditCardService,
    useClass: CreditCardService,
  },
];
@Module({
  imports: [TypeOrmModule.forFeature([CreditCard])],
  controllers: [CreditCardController],
  providers,
  exports: providers,
})
export class CreditCardModule {}
