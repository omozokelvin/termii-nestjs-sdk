import { TermiiRequestSenderIdRequest } from '../requests';

export interface TermiiBaseResponse {
  code: string;
  message: string;
}

export interface TermiiSendMessageResponse
  extends Pick<TermiiBaseResponse, 'message'> {
  message_id: string;
  balance: number;
  user: string;
}

export interface TermiiSendBulkMessageResponse
  extends TermiiSendMessageResponse {
  code: string;
}

interface TermiiSenderId extends TermiiRequestSenderIdRequest {
  status: string;
  created_at: string;
}

export interface TermiiMeta {
  current_page: number;
  from: number;
  last_page: number;
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface TermiiFetchSenderIdsResponse extends TermiiMeta {
  data: TermiiSenderId[];
  first_page_url: string;
  last_page_url: string;
  next_page_url: string;
  prev_page_url: null;
}

export interface TermiiRequestSenderIdResponse extends TermiiBaseResponse {}

export interface TermiiSendNumberMessageResponse
  extends TermiiSendMessageResponse {}

export type TermiiSendTemplateResponse = TermiiSendBulkMessageResponse[];

export interface TermiiCreatePhoneBookResponse
  extends Pick<TermiiBaseResponse, 'message'> {}

export interface TermiiUpdatePhoneBookResponse
  extends TermiiCreatePhoneBookResponse {}

export interface TermiiDeletePhoneBookResponse
  extends TermiiCreatePhoneBookResponse {}

export interface TermiiPhoneBook {
  id: string;
  name: string;
  total_number_of_contacts: number;
  date_created: string;
  last_updated: string;
}

export interface TermiiLinks {
  first: string | null;
  last: string | null;
  prev: string | null;
  next: string | null;
}

export interface TermiiFetchPhoneBooksResponse {
  data: TermiiPhoneBook[];
  links: TermiiLinks;
  meta: TermiiMeta;
}
