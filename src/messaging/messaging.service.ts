import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { TermiiModuleOptions } from '../interfaces';
import { TERMII_BASE_URL, TERMII_MODULE_OPTIONS } from '../common';
import {
  TermiiRequestSenderIdRequest,
  TermiiSendBulkMessageRequest,
  TermiiSendMessageRequest,
  TermiiSendNumberMessageRequest,
  TermiiSendTemplateRequest,
  TermiiCreatePhoneBookRequest,
  TermiiUpdatePhoneBookRequest,
} from './requests';
import {
  TermiiFetchSenderIdsResponse,
  TermiiRequestSenderIdResponse,
  TermiiSendMessageResponse,
  TermiiSendBulkMessageResponse,
  TermiiSendNumberMessageResponse,
  TermiiSendTemplateResponse,
  TermiiFetchPhoneBooksResponse,
  TermiiCreatePhoneBookResponse,
  TermiiUpdatePhoneBookResponse,
  TermiiDeletePhoneBookResponse,
} from './responses';

@Injectable()
export class MessagingService {
  private readonly apiKey: string;
  // private readonly senderId: string;
  private readonly baseUrl: string;

  constructor(
    @Inject(TERMII_MODULE_OPTIONS)
    private readonly options: TermiiModuleOptions,
    private readonly httpService: HttpService
  ) {
    this.apiKey = this.options.apiKey;
    // this.senderId = this.options.senderId;
    this.baseUrl = this.options.baseUrl || TERMII_BASE_URL;
  }

  // Sender ID API

  async fetchSenderId(): Promise<TermiiFetchSenderIdsResponse> {
    const url = `${this.baseUrl}/api/sender-id`;

    const response = await firstValueFrom(
      this.httpService.get<TermiiFetchSenderIdsResponse>(url, {
        params: { api_key: this.apiKey },
      })
    );

    return response.data;
  }

  async requestSenderId(
    payload: TermiiRequestSenderIdRequest
  ): Promise<TermiiRequestSenderIdResponse> {
    const url = `${this.baseUrl}/api/sender-id/request`;

    const data = {
      ...payload,
      api_key: this.apiKey,
    };

    const response = await firstValueFrom(
      this.httpService.post<TermiiRequestSenderIdResponse>(url, data)
    );

    return response.data;
  }

  // Messaging API

  async sendMessage(
    payload: TermiiSendMessageRequest
  ): Promise<TermiiSendMessageResponse> {
    const url = `${this.baseUrl}/api/sms/send`;

    const {
      type = 'plain',
      channel = 'generic',
      to: recipients,
      ...restOfPayload
    } = payload;

    const to = Array.isArray(recipients) ? recipients : [recipients];

    const data: TermiiSendMessageRequest & { api_key: string } = {
      ...restOfPayload,
      api_key: this.apiKey,
      to,
      type,
      channel,
    };

    const response = await firstValueFrom(
      this.httpService.post<TermiiSendMessageResponse>(url, data)
    );

    return response.data;
  }

  async sendBulkMessage(
    payload: TermiiSendBulkMessageRequest
  ): Promise<TermiiSendBulkMessageResponse> {
    const url = `${this.baseUrl}/api/sms/send/bulk`;

    const { type = 'plain', channel = 'generic', ...restOfPayload } = payload;

    const data: TermiiSendMessageRequest & { api_key: string; from: string } = {
      ...restOfPayload,
      api_key: this.apiKey,
      type,
      channel,
    };

    const response = await firstValueFrom(
      this.httpService.post<TermiiSendBulkMessageResponse>(url, data)
    );

    return response.data;
  }

  // Number API

  async sendNumberMessage(
    payload: TermiiSendNumberMessageRequest
  ): Promise<TermiiSendNumberMessageResponse> {
    const url = `${this.baseUrl}/api/sms/number/send`;

    const data: TermiiSendNumberMessageRequest & { api_key: string } = {
      ...payload,
      api_key: this.apiKey,
    };

    const response = await firstValueFrom(
      this.httpService.post<TermiiSendNumberMessageResponse>(url, data)
    );

    return response.data;
  }

  // Templates API

  async sendTemplate(
    payload: TermiiSendTemplateRequest
  ): Promise<TermiiSendTemplateResponse> {
    const url = `${this.baseUrl}/api/send/template`;

    const data = {
      ...payload,
      api_key: this.apiKey,
    };

    const response = await firstValueFrom(
      this.httpService.post<TermiiSendTemplateResponse>(url, data)
    );

    return response.data;
  }

  // Campaign API

  async fetchPhoneBooks(): Promise<TermiiFetchPhoneBooksResponse> {
    const url = `${this.baseUrl}/api/phonebooks`;

    const response = await firstValueFrom(
      this.httpService.get<TermiiFetchPhoneBooksResponse>(url, {
        params: { api_key: this.apiKey },
      })
    );

    return response.data;
  }

  async createPhoneBook(
    payload: TermiiCreatePhoneBookRequest
  ): Promise<TermiiCreatePhoneBookResponse> {
    const url = `${this.baseUrl}/api/phonebooks`;

    const data = {
      ...payload,
      api_key: this.apiKey,
    };

    const response = await firstValueFrom(
      this.httpService.post<TermiiCreatePhoneBookResponse>(url, data)
    );

    return response.data;
  }

  async updatePhoneBook(
    phonebookId: string,
    payload: TermiiUpdatePhoneBookRequest
  ): Promise<TermiiUpdatePhoneBookResponse> {
    const url = `${this.baseUrl}/api/phonebooks/${phonebookId}`;

    const data = {
      ...payload,
      api_key: this.apiKey,
    };

    const response = await firstValueFrom(
      this.httpService.patch<TermiiUpdatePhoneBookResponse>(url, data)
    );

    return response.data;
  }

  async deletePhoneBook(
    phonebookId: string
  ): Promise<TermiiDeletePhoneBookResponse> {
    const url = `${this.baseUrl}/api/phonebooks/${phonebookId}`;

    const response = await firstValueFrom(
      this.httpService.delete<TermiiDeletePhoneBookResponse>(url, {
        params: { api_key: this.apiKey },
      })
    );

    return response.data;
  }
}
