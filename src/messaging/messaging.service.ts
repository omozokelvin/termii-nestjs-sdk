import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { TermiiModuleOptions } from '../interfaces';
import { TERMII_BASE_URL, TERMII_MODULE_OPTIONS } from '../common';
import { SendMessageDto } from './dtos';
import { SendMessageResponse } from './interfaces/send-message.response';
import { TermiiSendMessagePayload } from './interfaces/send-message.payload';

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

  async sendMessage(payload: SendMessageDto): Promise<SendMessageResponse> {
    const url = `${this.baseUrl}/api/sms/send`;

    const data: TermiiSendMessagePayload = {
      ...payload,
      api_key: this.apiKey,
      from: this.senderId,
      type: payload.type || 'plain',
      channel: payload.channel || 'generic',
    };

    const response = await firstValueFrom(
      this.httpService.post<SendMessageResponse>(url, data)
    );

    return response.data;
  }
}
