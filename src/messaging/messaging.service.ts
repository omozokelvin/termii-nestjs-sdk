import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { TermiiModuleOptions } from '../interfaces';
import { TERMII_BASE_URL, TERMII_MODULE_OPTIONS } from '../common';
import { RequestSenderIdDto, SendMessageDto } from './dtos';
import {
  FetchSenderIdsResponse,
  RequestSenderIdResponse,
  SendMessageResponse,
  TermiiSendMessagePayload,
} from './interfaces';

@Injectable()
export class MessagingService {
  private readonly apiKey: string;
  private readonly senderId: string;
  private readonly baseUrl: string;

  constructor(
    @Inject(TERMII_MODULE_OPTIONS)
    private readonly options: TermiiModuleOptions,
    private readonly httpService: HttpService
  ) {
    this.apiKey = this.options.apiKey;
    this.senderId = this.options.senderId;
    this.baseUrl = this.options.baseUrl || TERMII_BASE_URL;
  }

  async fetchSenderId(): Promise<FetchSenderIdsResponse> {
    const url = `${this.baseUrl}/api/sender-id`;

    const response = await firstValueFrom(
      this.httpService.get<FetchSenderIdsResponse>(url, {
        params: { api_key: this.apiKey },
      })
    );

    return response.data;
  }

  async requestSenderId(
    payload: RequestSenderIdDto
  ): Promise<RequestSenderIdResponse> {
    const url = `${this.baseUrl}/api/sender-id/request`;

    const data = {
      ...payload,
      api_key: this.apiKey,
    };

    const response = await firstValueFrom(
      this.httpService.post<RequestSenderIdResponse>(url, data)
    );

    return response.data;
  }

  async sendMessage(payload: SendMessageDto): Promise<SendMessageResponse> {
    const url = `${this.baseUrl}/api/sms/send`;

    const {
      type = 'plain',
      channel = 'generic',
      to: recipients,
      ...restOfPayload
    } = payload;

    const to = Array.isArray(recipients) ? recipients : [recipients];

    const data: TermiiSendMessagePayload = {
      ...restOfPayload,
      api_key: this.apiKey,
      from: this.senderId,
      to,
      type,
      channel,
    };

    const response = await firstValueFrom(
      this.httpService.post<SendMessageResponse>(url, data)
    );

    return response.data;
  }
}
