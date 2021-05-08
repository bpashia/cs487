import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Address } from '../entities';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>
  ) {}

  findAll(): Promise<Address[]> {
    return this.addressRepository.find();
  }

  findOne(addressID: number): Promise<Address> {
    return this.addressRepository.findOne({ addressID });
  }

  findOneByEmail(addressID: number): Promise<Address> {
    return this.addressRepository.findOne({ addressID });
  }

  async insert(address: Partial<Address>): Promise<Address> {
    return await this.addressRepository.save({
      ...address,
    });
  }

  async update(id: number, address: Partial<Address>): Promise<Address> {
    const entity = await this.addressRepository.findOneOrFail({
      addressID: id,
    });

    if (!entity) {
      throw 'Address not found';
    }
    const { addressID, ...changes } = address;
    const result = await this.addressRepository.save({
      ...entity,
      ...changes,
    });

    return result;
  }

  async delete(id: { addressID: number; email: string }): Promise<number> {
    await this.addressRepository.delete(id);
    return id.addressID;
  }

  async softDelete(id: { addressId: number; email: string }): Promise<number> {
    await this.addressRepository.softDelete(id);
    return id.addressId;
  }
}
