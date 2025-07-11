# Termii NestJS SDK

[![npm version](https://badge.fury.io/js/termii-nestjs.svg)](https://badge.fury.io/js/termii-nestjs)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A robust, well-structured, and fully-typed NestJS SDK for interacting with the [Termii API](https://developers.termii.com/). This library simplifies sending SMS and WhatsApp messages, with built-in validation and a developer-friendly API.

## Features

-   ✅ Easy integration with any NestJS application
-   ✅ Static (`forRoot`) and async (`forRootAsync`) module configuration
-   ✅ Built-in validation for request payloads using `class-validator`
-   ✅ Strongly-typed DTOs for both requests and responses
-   ✅ Support for sending SMS and WhatsApp messages (including media)

## Installation

```bash
npm install termii-nestjs
```

or

```bash
yarn add termii-nestjs
```

This library has peer dependencies on several NestJS packages. If they are not already installed in your project, you will need to add them:

```bash
npm install @nestjs/common @nestjs/core class-validator class-transformer
```

## Getting Started

### 1. Import the Module

Import `TermiiModule` into your root `AppModule`.

#### Static Configuration (`forRoot`)

This method is suitable for simple configurations where credentials are not loaded dynamically.

```typescript
// src/app.module.ts
import { Module } from '@nestjs/common';
import { TermiiModule } from 'termii-nestjs';

@Module({
  imports: [
    TermiiModule.forRoot({
      apiKey: 'YOUR_TERMII_API_KEY',
      senderId: 'YOUR_SENDER_ID',
      // baseUrl: 'https://api.ng.termii.com' // Optional: Override base URL
    }),
  ],
})
export class AppModule {}
```

#### Async Configuration (`forRootAsync`)

This is the recommended approach, especially when using `@nestjs/config` to manage environment variables.

```typescript
// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TermiiModule } from 'termii-nestjs';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TermiiModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        apiKey: configService.get<string>('TERMII_API_KEY'),
        senderId: configService.get<string>('TERMII_SENDER_ID'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
```

### 2. Inject and Use `TermiiService`

You can now inject `TermiiService` into any of your services or controllers.

#### Example: Sending a simple SMS

```typescript
import { Injectable, Logger } from '@nestjs/common';
import { TermiiService, SendMessageDto } from 'termii-nestjs';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  constructor(private readonly termiiService: TermiiService) {}

  async sendWelcomeSms(phoneNumber: string) {
    const payload: SendMessageDto = {
      to: phoneNumber, // Can also be an array of numbers: ['234...', '234...']
      sms: 'Welcome to our platform!',
      channel: 'dnd', // Use 'dnd' to bypass DND restrictions
    };

    try {
      const response = await this.termiiService.sendMessage(payload);
      this.logger.log(`Message sent successfully. Message ID: ${response.message_id}`);
    } catch (error) {
      this.logger.error('Failed to send SMS', error.response?.data || error.message);
    }
  }
}
```

#### Example: Sending a WhatsApp message with media

```typescript
import { Injectable, Logger } from '@nestjs/common';
import { TermiiService, SendMessageDto } from 'termii-nestjs';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  constructor(private readonly termiiService: TermiiService) {}

  async sendWhatsAppInvoice(phoneNumber: string) {
    const payload: SendMessageDto = {
      to: phoneNumber,
      sms: 'Here is your invoice for this month.', // Required text fallback
      channel: 'whatsapp',
      media: {
        url: 'https://example.com/invoice.pdf',
        caption: 'Monthly Invoice',
      },
    };

    try {
      const response = await this.termiiService.sendMessage(payload);
      this.logger.log(`WhatsApp message sent. Message ID: ${response.message_id}`);
    } catch (error) {
      this.logger.error('Failed to send WhatsApp message', error.response?.data || error.message);
    }
  }
}
```

## License

This project is licensed under the MIT License.