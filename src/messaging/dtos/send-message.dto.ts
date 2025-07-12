import { MediaDto } from './media.dto';

export class SendMessageDto {
  to: string | string[];

  sms: string;

  channel?: 'dnd' | 'whatsapp' | 'generic';

  type?: 'plain';

  media?: MediaDto;
}
