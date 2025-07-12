import { Injectable } from '@nestjs/common';
import { MessagingService } from 'src/messaging';
import { InsightService } from 'src/insight';
import { TokenService } from 'src/token';

@Injectable()
export class TermiiService {
  constructor(
    private readonly insightService: InsightService,
    private readonly messagingService: MessagingService,
    private readonly tokenService: TokenService
  ) {}

  get insight() {
    return this.insightService;
  }

  get messaging() {
    return this.messagingService;
  }

  get token() {
    return this.tokenService;
  }
}
