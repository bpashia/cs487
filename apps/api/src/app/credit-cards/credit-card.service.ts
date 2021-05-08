import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreditCard } from '../entities';

@Injectable()
export class CreditCardService {
  constructor(
    @InjectRepository(CreditCard)
    private creditCardRepository: Repository<CreditCard>
  ) {}

  findAll(): Promise<CreditCard[]> {
    return this.creditCardRepository.find();
  }

  findOne({
    creditCardNumber,
    email,
  }: {
    creditCardNumber: number;
    email: string;
  }): Promise<CreditCard> {
    return this.creditCardRepository.findOne({ creditCardNumber, email });
  }

  async insert(creditCard: Partial<CreditCard>): Promise<CreditCard> {
    return await this.creditCardRepository.save({
      ...creditCard,
    });
  }

  // async update(
  //   id: number,
  //   creditCard: Partial<CreditCard>
  // ): Promise<CreditCard> {
  //   const entity = await this.creditCardRepository.findOneOrFail({
  //     creditCardID: id,
  //   });

  //   if (!entity) {
  //     throw 'CreditCard not found';
  //   }
  //   const { creditCardID, ...changes } = creditCard;
  //   const result = await this.creditCardRepository.save({
  //     ...entity,
  //     ...changes,
  //   });

  //   return result;
  // }

  async delete({
    creditCardNumber,
    email,
  }: {
    creditCardNumber: number;
    email: string;
  }): Promise<number> {
    await this.creditCardRepository.delete({ creditCardNumber, email });
    return creditCardNumber;
  }
}
