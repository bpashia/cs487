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

  async update(
    cardNumber: number,
    creditCard: Partial<CreditCard>
  ): Promise<CreditCard> {
    const entity = await this.creditCardRepository.findOneOrFail({
      creditCardNumber: cardNumber,
      email: creditCard.email,
    });

    if (!entity) {
      throw 'Credit Card not found';
    }
    console.log({ cardNumber, creditCard });
    if (creditCard.creditCardNumber !== cardNumber) {
      const deleted = await this.delete({
        creditCardNumber: cardNumber,
        email: creditCard.email,
      });
      console.log('Deleted creditCard in update');
      const created = await this.insert({ ...entity, ...creditCard });
      console.log('Created in update', { created });
      return created;
    }
    const result = await this.creditCardRepository.save({
      ...entity,
      ...creditCard,
    });

    return result;
  }

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
