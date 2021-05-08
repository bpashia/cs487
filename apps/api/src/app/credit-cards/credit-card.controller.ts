import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';

import { CreditCardService } from './credit-card.service';

import { ProviderToken, API_PATH } from '../api-lib.constants';
import { CreditCard } from '../entities';
import { ApiResponse, apiSuccess } from '@airline/airline-interfaces';

@Controller(`${API_PATH}/credit-cards`)
export class CreditCardController {
  constructor(
    @Inject(ProviderToken.CreditCardService)
    private creditCardService: CreditCardService
  ) {}

  @Get()
  async getAll(): Promise<ApiResponse<CreditCard[]>> {
    // this.logger.info('QUERY in FindAll Creditors', { query })
    const addresses = await this.creditCardService.findAll();
    // this.logger.info('findAll result', creditors)
    return apiSuccess(addresses);
  }

  @Post()
  async create(
    @Body() address: { data: Partial<CreditCard> }
  ): Promise<ApiResponse<CreditCard>> {
    console.log('controller create', { address });
    const created = await this.creditCardService.insert(address.data);
    console.log('created', created);
    return apiSuccess(created);
  }

  // @Put()
  // async update(

  //   @Body() creditCard: { data: Partial<CreditCard> }
  // ): Promise<ApiResponse<CreditCard>> {
  //   console.log('updating address', { addressID, address });
  //   const saved = await this.addressService.update({email:creditCard.data.email, creditCardNumber: creditCard.data.creditCardNumber}, address.data);

  //   return apiSuccess(saved);
  // }

  // @Get(':addressID')
  // async getOne(
  //   @Param('addressID') addressID: number
  // ): Promise<ApiResponse<CreditCard>> {
  //   const address = await this.addressService.findOne(addressID);

  //   return apiSuccess(address);
  // }

  @Put('delete')
  async delete(
    @Body()
    cardNumberAndEmail: {
      data: { creditCardNumber: number; email: string };
    }
  ): Promise<ApiResponse<string>> {
    const removed = await this.creditCardService.delete(
      cardNumberAndEmail.data
    );
    return apiSuccess(String(removed));
  }
}
