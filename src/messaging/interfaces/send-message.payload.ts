import { TermiiSendMessageDto } from '../dtos';

export interface TermiiSendMessagePayload extends TermiiSendMessageDto {
  api_key: string;
  from: string;
}
