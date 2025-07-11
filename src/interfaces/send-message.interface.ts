export interface SendMessageDto {
  to: string;
  sms: string;
  channel?: 'dnd' | 'whatsapp' | 'generic';
  type?: 'plain';
}

export interface SendMessageResponse {
  message_id: string;
  message: string;
  balance: number;
  user: string;
}