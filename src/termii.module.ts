import { DynamicModule, Global, Module, Provider, Type } from '@nestjs/common';
import {
  TermiiModuleAsyncOptions,
  TermiiModuleOptions,
  TermiiOptionsFactory,
} from './interfaces/termii.interface';
import { TERMII_MODULE_OPTIONS } from './common/constants';
import { HttpModule } from '@nestjs/axios';
import { MessagingService } from './messaging/messaging.service';
import { TokenService } from './token/token.service';
import { InsightService } from './insight/insight.service';
import { TermiiService } from './termii.service';

@Global()
@Module({
  imports: [HttpModule],
  providers: [MessagingService, TokenService, InsightService, TermiiService],
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
      ...(useExisting ? [{ provide: useExisting, useExisting }] : []),
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
