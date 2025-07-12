export interface TermiiSendTokenRequest {
  message_type: 'NUMERIC' | 'ALPHANUMERIC';
  to: string;
  from: string;
  channel: 'dnd' | 'WhatsApp' | 'generic' | 'email';
  pin_attempts: number;
  pin_time_to_live: number;
  pin_length: number;
  pin_placeholder: string;
  message_text: string;
  pin_type?: 'NUMERIC' | 'ALPHANUMERIC';
}

export interface TermiiVoiceTokenRequest
  extends Pick<
    TermiiSendTokenRequest,
    'pin_attempts' | 'pin_time_to_live' | 'pin_length'
  > {
  phone_number: string;
}

export interface TermiiVoiceCallRequest
  extends Pick<TermiiVoiceTokenRequest, 'phone_number'> {
  code: string;
}

export interface TermiiEmailTokenRequest
  extends Pick<TermiiVoiceCallRequest, 'code'> {
  email_address: string;
  email_configuration_id: string;
}

export interface TermiiVerifyTokenRequest {
  pin_id: string;
  pin: string;
}

export interface TermiiInAppTokenRequest extends TermiiVoiceTokenRequest {
  pin_type: 'NUMERIC' | 'ALPHANUMERIC';
}
