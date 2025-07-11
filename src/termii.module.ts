import { DynamicModule, Global, Module, Provider, Type } from '@nestjs/common';
import {
  TermiiModuleAsyncOptions,
  TermiiModuleOptions,
  TermiiOptionsFactory,
} from './interfaces/termii.interface';

import { TermiiService } from './termii.service'; // Assuming you have this service
import { TERMII_MODULE_OPTIONS } from './common/constants';

@Global()
@Module({
  providers: [TermiiService],
  exports: [TermiiService],
})
export class TermiiModule {
  public static forRoot(options: TermiiModuleOptions): DynamicModule {
    return {
      module: TermiiModule,
      providers: [
        {
          provide: TERMII_MODULE_OPTIONS,
          useValue: options,
        },
      ],
    };
  }

  public static forRootAsync(options: TermiiModuleAsyncOptions): DynamicModule {
    return {
      module: TermiiModule,
      // This passes the ConfigModule to the context of the dynamic module
      imports: options.imports || [],
      providers: [...this.createAsyncProviders(options)],
    };
  }

  private static createAsyncProviders(
    options: TermiiModuleAsyncOptions
  ): Provider[] {
    if (options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }

    const useExisting = options.useExisting as Type<TermiiOptionsFactory>;
    const useClass = options.useClass as Type<TermiiOptionsFactory>;

    return [
      this.createAsyncOptionsProvider(options),
      ...(useClass ? [{ provide: useClass, useClass }] : []),
    ];
  }

  private static createAsyncOptionsProvider(
    options: TermiiModuleAsyncOptions
  ): Provider {
    return {
      provide: TERMII_MODULE_OPTIONS,
      useFactory: options.useFactory,
      inject: options.inject || [],
    };
  }
}
