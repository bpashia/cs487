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

import { CustomerService } from './customer.service';

import { ProviderToken, API_PATH } from '../api-lib.constants';
import { Address, Customer, Flight, Price } from '../entities';
import { ApiResponse, apiSuccess } from '@airline/airline-interfaces';

@Controller(`${API_PATH}/customers`)
export class CustomerController {
  constructor(
    @Inject(ProviderToken.CustomerService)
    private customerService: CustomerService
  ) {}

  @Get()
  async getAll(): Promise<ApiResponse<Customer[]>> {
    // this.logger.info('QUERY in FindAll Creditors', { query })
    const creditors = await this.customerService.findAll();
    // this.logger.info('findAll result', creditors)
    return apiSuccess(creditors);
  }

  @Post()
  async create(
    @Body() customer: { data: Partial<Customer> }
  ): Promise<ApiResponse<Customer>> {
    console.log('controller create', { customer });
    const created = await this.customerService.insert(customer.data);
    console.log('created', created);
    return apiSuccess(created);
  }
  @Put('login')
  async login(
    @Body() customer: { data: { email: string } }
  ): Promise<ApiResponse<Customer>> {
    console.log(`logging in customer ${customer.data.email}`);
    const loggedInCustomer = await this.customerService.customerLogin(
      customer.data.email
    );
    console.log(JSON.stringify(loggedInCustomer, null, 2));
    return apiSuccess(loggedInCustomer);
  }

  @Put(':email')
  async update(
    @Param('email') email: string,
    @Body() customer: { data: Partial<Customer> }
  ): Promise<ApiResponse<Customer>> {
    console.log('updating creditor', { email, customer });
    const saved = await this.customerService.update(email, customer.data);
    return apiSuccess(saved);
  }
  @Get('addresses/:email')
  async getAddresses(
    @Param('email') email: string
  ): Promise<ApiResponse<Address[]>> {
    const addresses = await this.customerService.getCustomerAddresses(email);

    return apiSuccess(addresses);
  }

  @Get('credit-cards/:email')
  async getCreditCards(
    @Param('email') email: string
  ): Promise<ApiResponse<Address[]>> {
    const creditCards = await this.customerService.getCustomerCreditCards(
      email
    );

    return apiSuccess(creditCards);
  }

  @Get('flights/:email')
  async getCustomerFlights(
    @Param('email') email: string
  ): Promise<ApiResponse<Flight[]>> {
    const flights = await this.customerService.getCustomerFlights(email);
    return apiSuccess(flights);
  }

  @Get('available-flights')
  async getAvailableFlights(): Promise<
    ApiResponse<{ economyFlights: Flight[]; firstClassFlights: Flight[] }>
  > {
    const flights = await this.customerService.getAvailableFlights();
    return apiSuccess(flights);
  }

  @Get('prices')
  async getAvailablePrices(): Promise<ApiResponse<Price[]>> {
    const prices = await this.customerService.getAvailableFlightPrices();
    return apiSuccess(prices);
  }

  @Get(':email')
  async getOne(@Param('email') email: string): Promise<ApiResponse<Customer>> {
    const customer = await this.customerService.findOne(email);

    return apiSuccess(customer);
  }

  @Delete(':email')
  async remove(@Param('email') email: string): Promise<ApiResponse<string>> {
    const removed = await this.customerService.delete(email);
    return apiSuccess(removed);
  }
}
