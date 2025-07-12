import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { TermiiModuleOptions } from '../interfaces';
import { TERMII_BASE_URL, TERMII_MODULE_OPTIONS } from '../common';
import {
  TermiiBalanceResponse,
  TermiiSearchResponse,
  TermiiStatusResponse,
  TermiiHistoryResponse,
} from './responses';
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

  // Balance
  async getBalance(): Promise<TermiiBalanceResponse> {
    const url = `${this.baseUrl}/api/get-balance`;

    const response = await firstValueFrom(
      this.httpService.get<TermiiBalanceResponse>(url, {
        params: { api_key: this.apiKey },
      })
    );
    return response.data;
  }

  // Search
  async search(phoneNumber: string): Promise<TermiiSearchResponse> {
    const url = `${this.baseUrl}/api/check/dnd`;

    const response = await firstValueFrom(
      this.httpService.get<TermiiSearchResponse>(url, {
        params: {
          api_key: this.apiKey,
          phone_number: phoneNumber,
        },
      })
    );

    return response.data;
  }

  // Status
  async getStatus(
    phoneNumber: string,
    countryCode: string
  ): Promise<TermiiStatusResponse> {
    const url = `${this.baseUrl}/api/insight/number/query`;

    const response = await firstValueFrom(
      this.httpService.get<TermiiStatusResponse>(url, {
        params: {
          api_key: this.apiKey,
          phone_number: phoneNumber,
          country_code: countryCode,
        },
      })
    );

    return response.data;
  }

  // History
  async getHistory(messageId?: string): Promise<TermiiHistoryResponse> {
    const url = `${this.baseUrl}/api/sms/inbox`;
    const params: { api_key: string; message_id?: string } = {
      api_key: this.apiKey,
    };

    if (messageId) {
      params.message_id = messageId;
    }

    const response = await firstValueFrom(
      this.httpService.get<TermiiHistoryResponse>(url, {
        params,
      })
    );

    return response.data;
  }
}
