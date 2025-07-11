import { DynamicModule, Module, Provider } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TermiiService } from './termii.service';
import {
  TermiiModuleAsyncOptions,
  TermiiModuleOptions,
} from './interfaces/termii-options.interface';
import { TERMII_MODULE_OPTIONS } from './common/constants';

@Module({})
export class TermiiModule {
  static forRoot(options: TermiiModuleOptions): DynamicModule {
    return {
      module: TermiiModule,
      imports: [HttpModule],
      providers: [
        {
          provide: TERMII_MODULE_OPTIONS,
          useValue: options,
        },
        TermiiService,
      ],
      exports: [TermiiService],
    };
  }

  static forRootAsync(options: TermiiModuleAsyncOptions): DynamicModule {
    const providers: Provider[] = [
      {
        provide: TERMII_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      },
      TermiiService,
    ];

    return {
      module: TermiiModule,
      imports: [HttpModule],
      providers: providers,
      exports: [TermiiService],
    };
  }
}