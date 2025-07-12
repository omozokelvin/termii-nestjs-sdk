export interface TermiiBalanceResponse {
  user: string;
  balance: number;
  currency: string;
}

export interface TermiiSearchResponse {
  number: string;
  status: string;
  network: string;
  network_code: string;
}

export interface TermiiRouteDetail {
  number: string;
  ported: number;
}

export interface TermiiCountryDetail {
  countryCode: string;
  mobileCountryCode: string;
  iso: string;
}

export interface TermiiOperatorDetail {
  operatorCode: string;
  operatorName: string;
  mobileNumberCode: string;
  mobileRoutingCode: string;
  carrierIdentificationCode: string;
  lineType: 'Mobile' | string;
}

export interface TermiiResultItem {
  routeDetail: TermiiRouteDetail;
  countryDetail: TermiiCountryDetail;
  operatorDetail: TermiiOperatorDetail;
  status: number;
}

export interface TermiiStatusResponse {
  result: TermiiResultItem[];
}

export interface TermiiHistoryItem {
  sender: string;
  receiver: string;
  message: string;
  amount: number;
  reroute: number;
  status: string;
  sms_type: 'plain' | string;
  send_by: 'sender' | string;
  media_url: string | null;
  message_id: string;
  notify_url: string | null;
  notify_id: string | null;
  created_at: string;
}

export type TermiiHistoryResponse = TermiiHistoryItem[];
