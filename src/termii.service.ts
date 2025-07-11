import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { SendMessageResponse, TermiiModuleOptions } from './interfaces';
import { TERMII_BASE_URL, TERMII_MODULE_OPTIONS } from './common';
import { SendMessageDto } from './dtos';

@Injectable()
export class TermiiService {
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

  /**
   * Send a message using Termii API
   * @param payload - The message payload
   */
  async sendMessage(payload: SendMessageDto): Promise<SendMessageResponse> {
    const url = `${this.baseUrl}/api/sms/send`;

    const data: any = {
      api_key: this.apiKey,
      to: payload.to,
      from: this.senderId,
      sms: payload.sms,
      type: payload.type || 'plain',
      channel: payload.channel || 'generic',
    };

    if (payload.media) {
      data.media = payload.media;
    }

    const response = await firstValueFrom(
      this.httpService.post<SendMessageResponse>(url, data)
    );

    return response.data;
  }
}
