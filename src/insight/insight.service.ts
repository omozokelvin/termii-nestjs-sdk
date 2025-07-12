import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { TermiiModuleOptions } from '../interfaces';
import { TERMII_BASE_URL, TERMII_MODULE_OPTIONS } from '../common';
import { TermiiBalanceResponse } from './interfaces';

@Injectable()
export class InsightService {
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
   * Get the account balance
   */
  async getBalance(): Promise<TermiiBalanceResponse> {
    const url = `${this.baseUrl}/api/get-balance`;

    const response = await firstValueFrom(
      this.httpService.get<TermiiBalanceResponse>(url, {
        params: { api_key: this.apiKey },
      })
    );
    return response.data;
  }
}
