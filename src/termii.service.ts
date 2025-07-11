import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { SendMessageDto, SendMessageResponse, TermiiModuleOptions } from 'src/interfaces';
import { TERMII_MODULE_OPTIONS, TERMII_BASE_URL } from 'src/common/constants';


@Injectable()
export class TermiiService {
  private readonly apiKey: string;
  private readonly senderId: string;
  private readonly baseUrl: string;

  constructor(
    @Inject(TERMII_MODULE_OPTIONS)
    private readonly options: TermiiModuleOptions,
    private readonly httpService: HttpService,
  ) {
    this.apiKey = this.options.apiKey;
    this.senderId = this.options.senderId;
    this.baseUrl = this.options.baseUrl || TERMII_BASE_URL;
  }

  async sendMessage(payload: SendMessageDto): Promise<SendMessageResponse> {
    const url = `${this.baseUrl}/api/sms/send`;
    const data = {
      api_key: this.apiKey,
      to: payload.to,
      from: this.senderId,
      sms: payload.sms,
      type: payload.type || 'plain',
      channel: payload.channel || 'generic',
    };

    const response = await firstValueFrom(
      this.httpService.post<SendMessageResponse>(url, data),
    );
    
    return response.data;
  }
}