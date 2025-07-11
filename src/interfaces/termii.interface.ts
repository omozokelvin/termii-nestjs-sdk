import { ModuleMetadata, Type } from '@nestjs/common';

/**
 * Options for configuring the TermiiModule.
 */
export interface TermiiModuleOptions {
  apiKey: string;
  senderId: string;
  baseUrl?: string;
}

export interface TermiiOptionsFactory {
  createTermiiOptions(): Promise<TermiiModuleOptions> | TermiiModuleOptions;
}

/**
 * Asynchronous options for configuring the TermiiModule.
 * This allows for dependency injection (e.g., using ConfigService).
 */
export interface TermiiModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useFactory?: (
    ...args: any[]
  ) => Promise<TermiiModuleOptions> | TermiiModuleOptions;
  inject?: any[];
  useClass?: Type<TermiiOptionsFactory>;
  useExisting?: Type<TermiiOptionsFactory>;
}
