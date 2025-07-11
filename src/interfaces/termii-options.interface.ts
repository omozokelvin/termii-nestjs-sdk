export interface TermiiModuleOptions {
  apiKey: string;
  senderId: string;
  baseUrl?: string;
}

export interface TermiiModuleAsyncOptions {
  useFactory: (...args: any[]) => Promise<TermiiModuleOptions> | TermiiModuleOptions;
  inject?: any[];
}