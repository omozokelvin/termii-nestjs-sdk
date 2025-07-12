import { TermiiSendBulkMessageResponse } from '../../messaging';

export interface TermiiSendTokenResponse {
  pinId: string;
  to: string;
  smsStatus: string;
}

export interface TermiiVoiceTokenResponse
  extends TermiiSendBulkMessageResponse {
  pinId: string;
}

export interface TermiiVoiceCallResponse extends TermiiVoiceTokenResponse {}

export interface TermiiEmailTokenResponse
  extends Omit<TermiiVoiceTokenResponse, 'pinId'> {}

export interface TermiiVerifyTokenResponse
  extends Pick<TermiiVoiceTokenResponse, 'pinId'> {
  verified: string | boolean;
  msisdn: string;
}

export interface TermiiInAppTokenResponseData {
  pin_id: string;
  otp: string;
  phone_number: string;
  phone_number_other: string;
}

export interface TermiiInAppTokenResponse {
  status: string;
  data: TermiiInAppTokenResponseData;
}
