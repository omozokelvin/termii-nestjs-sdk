import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { TERMII_BASE_URL, TERMII_MODULE_OPTIONS } from '../common';
import { TermiiModuleOptions } from '../interfaces';
import {
  TermiiSendTokenRequest,
  TermiiVoiceCallRequest,
  TermiiVoiceTokenRequest,
  TermiiEmailTokenRequest,
  TermiiVerifyTokenRequest,
  TermiiInAppTokenRequest,
} from './requests';
import {
  TermiiSendTokenResponse,
  TermiiVoiceCallResponse,
  TermiiVoiceTokenResponse,
  TermiiEmailTokenResponse,
  TermiiVerifyTokenResponse,
  TermiiInAppTokenResponse,
} from './responses';

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

  // Send Token
  async sendToken(
    payload: TermiiSendTokenRequest
  ): Promise<TermiiSendTokenResponse> {
    const url = `${this.baseUrl}/api/sms/otp/send`;
    const data = {
      api_key: this.apiKey,
      ...payload,
    };

    const response = await firstValueFrom(
      this.httpService.post<TermiiSendTokenResponse>(url, data)
    );

    return response.data;
  }

  // Voice Token
  async voiceToken(
    payload: TermiiVoiceTokenRequest
  ): Promise<TermiiVoiceTokenResponse> {
    const url = `${this.baseUrl}/api/sms/otp/send/voice`;
    const data = {
      api_key: this.apiKey,
      ...payload,
    };

    const response = await firstValueFrom(
      this.httpService.post<TermiiVoiceTokenResponse>(url, data)
    );

    return response.data;
  }

  // Voice Call
  async voiceCall(
    payload: TermiiVoiceCallRequest
  ): Promise<TermiiVoiceCallResponse> {
    const url = `${this.baseUrl}/api/sms/otp/call`;
    const data = {
      api_key: this.apiKey,
      ...payload,
    };

    const response = await firstValueFrom(
      this.httpService.post<TermiiVoiceCallResponse>(url, data)
    );

    return response.data;
  }

  // Email Token
  async emailToken(
    payload: TermiiEmailTokenRequest
  ): Promise<TermiiEmailTokenResponse> {
    const url = `${this.baseUrl}/api/email/otp/send`;
    const data = {
      api_key: this.apiKey,
      ...payload,
    };

    const response = await firstValueFrom(
      this.httpService.post<TermiiEmailTokenResponse>(url, data)
    );

    return response.data;
  }

  // Verify Token
  async verifyToken(
    payload: TermiiVerifyTokenRequest
  ): Promise<TermiiVerifyTokenResponse> {
    const url = `${this.baseUrl}/api/sms/otp/verify`;
    const data = {
      api_key: this.apiKey,
      ...payload,
    };

    const response = await firstValueFrom(
      this.httpService.post<TermiiVerifyTokenResponse>(url, data)
    );

    return response.data;
  }

  // In-App Token
  async inAppToken(
    payload: TermiiInAppTokenRequest
  ): Promise<TermiiInAppTokenResponse> {
    const url = `${this.baseUrl}/api/sms/otp/generate`;
    const data = {
      api_key: this.apiKey,
      ...payload,
    };

    const response = await firstValueFrom(
      this.httpService.post<TermiiInAppTokenResponse>(url, data)
    );

    return response.data;
  }
}
