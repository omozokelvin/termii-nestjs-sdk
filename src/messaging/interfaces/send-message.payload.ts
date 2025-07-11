import { SendMessageDto } from '../dtos';

export interface TermiiSendMessagePayload extends SendMessageDto {
  api_key: string;
  from: string;
}
