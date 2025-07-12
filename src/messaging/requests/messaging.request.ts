export interface TermiiMediaRequest {
  url: string;
  caption: string;
}

export interface TermiiSendMessageRequest {
  from: string;
  to: string | string[];
  sms: string;
  channel?: 'dnd' | 'whatsapp' | 'generic';
  type?: 'plain';
  media?: TermiiMediaRequest;
}

export interface TermiiSendBulkMessageRequest
  extends Omit<TermiiSendMessageRequest, 'to'> {
  to: string[];
}

export interface TermiiRequestSenderIdRequest {
  sender_id: string;
  usecase: string;
  company: string;
}

export interface TermiiSendNumberMessageRequest
  extends Pick<TermiiSendMessageRequest, 'sms'> {
  to: string;
}

export interface TermiiSendTemplateRequest {
  phone_number: string;
  device_id: string;
  template_id: string;
  data: Record<string, string | number>;
}

export interface TermiiCreatePhoneBookRequest {
  phonebook_name: string;
  description?: string;
}

export interface TermiiUpdatePhoneBookRequest {
  phonebook_name: string;
  description?: string;
}
