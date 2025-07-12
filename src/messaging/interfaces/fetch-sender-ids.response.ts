import { TermiiRequestSenderIdDto } from '../../messaging/dtos';

export class TemiiSenderId extends TermiiRequestSenderIdDto {
  status: string;
  created_at: string;
}

export interface TermiiFetchSenderIdsResponse {
  current_page: 1;
  data: TemiiSenderId[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: null;
  to: number;
  total: number;
}
