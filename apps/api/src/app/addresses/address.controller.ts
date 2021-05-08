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

import { AddressService } from './address.service';

import { ProviderToken, API_PATH } from '../api-lib.constants';
import { Address } from '../entities';
import { ApiResponse, apiSuccess } from '@airline/airline-interfaces';

@Controller(`${API_PATH}/addresses`)
export class AddressController {
  constructor(
    @Inject(ProviderToken.AddressService)
    private addressService: AddressService
  ) {}

  @Get()
  async getAll(): Promise<ApiResponse<Address[]>> {
    // this.logger.info('QUERY in FindAll Creditors', { query })
    const addresses = await this.addressService.findAll();
    // this.logger.info('findAll result', creditors)
    return apiSuccess(addresses);
  }

  @Post()
  async create(
    @Body() address: { data: Partial<Address> }
  ): Promise<ApiResponse<Address>> {
    console.log('controller create', JSON.stringify(address));
    const created = await this.addressService.insert(address.data);
    console.log('created', created);
    return apiSuccess(created);
  }

  @Put('delete')
  async remove(
    @Body() address: { data: { addressID: number; email: string } }
  ): Promise<ApiResponse<string>> {
    console.log('controller delete', JSON.stringify(address));
    const removed = await this.addressService.delete(address.data);
    return apiSuccess(String(removed));
  }

  @Put(':addressID')
  async update(
    @Param('addressID') addressID: number,
    @Body() address: { data: Partial<Address> }
  ): Promise<ApiResponse<Address>> {
    console.log('updating address', { addressID, address });
    const saved = await this.addressService.update(addressID, address.data);

    return apiSuccess(saved);
  }

  @Get(':addressID')
  async getOne(
    @Param('addressID') addressID: number
  ): Promise<ApiResponse<Address>> {
    const address = await this.addressService.findOne(addressID);

    return apiSuccess(address);
  }
}
