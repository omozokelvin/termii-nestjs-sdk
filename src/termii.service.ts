import { Injectable } from '@nestjs/common';
import { MessagingService } from './messaging';
import { InsightService } from './insight';
import { TokenService } from './token';

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
