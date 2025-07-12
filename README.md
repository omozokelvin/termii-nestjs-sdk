# Termii NestJS SDK

[![npm version](https://badge.fury.io/js/termii-nestjs.svg)](https://badge.fury.io/js/termii-nestjs)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A robust, well-structured, and fully-typed NestJS SDK for interacting with the [Termii API](https://developers.termii.com/). This library simplifies sending SMS and WhatsApp messages with a developer-friendly API.

## Features

- ✅ Easy integration with any NestJS application
- ✅ Static (`forRoot`) and async (`forRootAsync`) module configuration
- ✅ Strongly-typed DTOs for both requests and responses
- ✅ **Full Termii API Coverage:**
  - **Messaging:** Send SMS & WhatsApp messages, manage Sender IDs, and Phone Books.
  - **Token:** Send, verify, and generate OTPs via SMS, Voice, and Email.
  - **Insights:** Check account balance, search history, and perform number lookups.

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

You can now inject `TermiiService` into any of your services or controllers. The service is namespaced to provide easy access to different parts of the Termii API:

- `termiiService.messaging`
- `termiiService.token`
- `termiiService.insight`

Below are examples for each service.

### Messaging API

The `messaging` service handles sending messages and managing related resources like Sender IDs and Phone Books.

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

#### Example: Requesting a Sender ID

```typescript
import { Injectable, Logger } from '@nestjs/common';
import { TermiiService, TermiiRequestSenderIdRequest } from 'termii-nestjs';

@Injectable()
export class OnboardingService {
  private readonly logger = new Logger(OnboardingService.name);

  constructor(private readonly termiiService: TermiiService) {}

  async requestNewSenderId() {
    const payload: TermiiRequestSenderIdRequest = {
      sender_id: 'NewBrand',
      usecase:
        'We will use this to send transaction notifications to our customers.',
      company: 'My Awesome Company',
    };
    try {
      const response = await this.termiiService.messaging.requestSenderId(
        payload
      );
      this.logger.log(`Sender ID request successful: ${response.message}`);
    } catch (error) {
      this.logger.error(
        'Failed to request Sender ID',
        error.response?.data || error.message
      );
    }
  }
}
```

### Token API

The `token` service is used for sending and verifying One-Time Passwords (OTPs) through various channels.

#### Example: Sending an OTP via SMS

```typescript
import { Injectable, Logger } from '@nestjs/common';
import { TermiiService, TermiiSendTokenRequest } from 'termii-nestjs';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private readonly termiiService: TermiiService) {}

  async sendLoginOtp(phoneNumber: string) {
    const payload: TermiiSendTokenRequest = {
      message_type: 'NUMERIC',
      to: phoneNumber,
      from: 'YourSenderID',
      channel: 'generic',
      pin_attempts: 3,
      pin_time_to_live: 5, // In minutes
      pin_length: 6,
      pin_placeholder: '< 1234 >',
      message_text: 'Your login code is < 1234 >. It will expire in 5 minutes.',
    };
    try {
      const response = await this.termiiService.token.sendToken(payload);
      this.logger.log(`OTP sent. Pin ID: ${response.pinId}`);
      return response.pinId; // Return pinId to be used for verification
    } catch (error) {
      this.logger.error(
        'Failed to send OTP',
        error.response?.data || error.message
      );
    }
  }
}
```

#### Example: Verifying an OTP

```typescript
import { Injectable, Logger } from '@nestjs/common';
import { TermiiService, TermiiVerifyTokenRequest } from 'termii-nestjs';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private readonly termiiService: TermiiService) {}

  async verifyLoginOtp(pinId: string, pin: string) {
    const payload: TermiiVerifyTokenRequest = { pin_id: pinId, pin: pin };
    try {
      const response = await this.termiiService.token.verifyToken(payload);
      if (response.verified) {
        this.logger.log(`OTP verification successful for ${response.msisdn}`);
        return true;
      }
      this.logger.warn(`OTP verification failed for pinId: ${pinId}`);
      return false;
    } catch (error) {
      this.logger.error(
        'Failed to verify OTP',
        error.response?.data || error.message
      );
      return false;
    }
  }
}
```

### Insight API

The `insight` service provides tools for checking your account status and looking up information about phone numbers.

#### Example: Checking Your Balance

```typescript
import { Injectable, Logger } from '@nestjs/common';
import { TermiiService } from 'termii-nestjs';

@Injectable()
export class AdminService {
  private readonly logger = new Logger(AdminService.name);

  constructor(private readonly termiiService: TermiiService) {}

  async checkAccountBalance() {
    try {
      const response = await this.termiiService.insight.getBalance();
      this.logger.log(
        `Account balance: ${response.balance} ${response.currency}`
      );
    } catch (error) {
      this.logger.error(
        'Failed to fetch balance',
        error.response?.data || error.message
      );
    }
  }
}
```

#### Example: Checking DND Status of a Phone Number

```typescript
import { Injectable, Logger } from '@nestjs/common';
import { TermiiService } from 'termii-nestjs';

@Injectable()
export class CustomerSupportService {
  private readonly logger = new Logger(CustomerSupportService.name);

  constructor(private readonly termiiService: TermiiService) {}

  async checkDndStatus(phoneNumber: string) {
    try {
      // The search method checks the DND status of a number
      const response = await this.termiiService.insight.search(phoneNumber);

      this.logger.log(`DND status for ${response.number}:`, {
        dndActive: response.dnd_active,
        network: response.network_code,
      });
    } catch (error) {
      this.logger.error(
        `Failed to check DND status for ${phoneNumber}`,
        error.response?.data || error.message
      );
    }
  }
}
```

## License

This project is licensed under the MIT License.
