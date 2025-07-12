import { TermiiMediaDto } from './media.dto';

export class TermiiSendMessageDto {
  to: string | string[];

  sms: string;

  channel?: 'dnd' | 'whatsapp' | 'generic';

  type?: 'plain';

  media?: TermiiMediaDto;
}
