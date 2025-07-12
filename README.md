# Termii NestJS SDK

[![npm version](https://badge.fury.io/js/termii-nestjs.svg)](https://badge.fury.io/js/termii-nestjs)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A robust, well-structured, and fully-typed NestJS SDK for interacting with the [Termii API](https://developers.termii.com/). This library simplifies sending SMS and WhatsApp messages with a developer-friendly API.

## Features

- ✅ Easy integration with any NestJS application
- ✅ Static (`forRoot`) and async (`forRootAsync`) module configuration
- ✅ Strongly-typed DTOs for both requests and responses
- ✅ **Full Termii API Coverage:**
  - **Messaging:** Send SMS & WhatsApp messages.
  - **Products:** Manage Sender IDs, Templates, and Campaigns.
  - **Insights:** Check account balance, search history, and perform number status checks.

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
npm install @nestjs/common @nestjs/core reflect-metadata
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
        // baseUrl: 'https://api.ng.termii.com' // Optional: Override base URL
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
```

### 2. Inject and Use `TermiiService`

You can now inject `TermiiService` into any of your services or controllers. Below is an example of a `NotificationService` that handles sending different types of messages.

#### Example: Sending an SMS

```typescript
import { Injectable, Logger } from '@nestjs/common';
import { TermiiService, TermiiSendMessageRequest } from 'termii-nestjs';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  constructor(private readonly termiiService: TermiiService) {}

  async sendWelcomeMessage(phoneNumber: string) {
    const payload: TermiiSendMessageRequest = {
      to: phoneNumber,
      from: 'YourSenderID', // This will be the sender ID displayed on the recipient's device
      sms: 'Hi there, welcome to our service!',
      channel: 'generic', // Use 'generic' for SMS, 'dnd' to bypass DND, or 'whatsapp'
    };

    try {
      const response = await this.termiiService.messaging.sendMessage(payload);
      this.logger.log(`Message sent. Message ID: ${response.message_id}`);
    } catch (error) {
      this.logger.error(
        'Failed to send SMS',
        error.response?.data || error.message
      );
    }
  }
}
```

## License

This project is licensed under the MIT License.
