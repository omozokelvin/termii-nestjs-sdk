import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { TERMII_BASE_URL, TERMII_MODULE_OPTIONS } from '../common';
import { TermiiModuleOptions } from '../interfaces';
import { SendTokenDto } from './dtos';

@Injectable()
export class TokenService {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor(
    @Inject(TERMII_MODULE_OPTIONS)
    private readonly options: TermiiModuleOptions,
    private readonly httpService: HttpService
  ) {
    this.apiKey = this.options.apiKey;
    this.baseUrl = this.options.baseUrl || TERMII_BASE_URL;
  }

  /**
   * Send a one-time-password token to a user
   * @param payload - The token payload
   */
  async sendToken(payload: SendTokenDto): Promise<any> {
    // TODO: Implement Termii Token API call
    console.log('Sending token:', payload);
    return Promise.resolve();
  }
}
