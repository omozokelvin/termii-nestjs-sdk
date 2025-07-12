import { Injectable } from '@nestjs/common';
import { MessagingService } from './messaging/messaging.service';
import { InsightService } from './insight/insight.service';
import { TokenService } from './token/token.service';

@Injectable()
export class TermiiService {
  constructor(
    private readonly messagingService: MessagingService,
    private readonly insightService: InsightService,
    private readonly tokenService: TokenService
  ) {}

  get messaging() {
    return this.messagingService;
  }

  get insight() {
    return this.insightService;
  }

  get token() {
    return this.tokenService;
  }
}
