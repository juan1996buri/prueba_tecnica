import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { FakeStoreService } from 'src/fake-store/fake-store.service';
import { AuthService } from './auth.service';

export interface Payload {
  sub: number;
  username?: string;
  email?: string;
  userId?: number;
}

@Controller('auth')
export class AuthController {
  constructor(
    private readonly fakeStoreService: FakeStoreService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  login(@Body() req: any) {
    return this.fakeStoreService.request('POST', '/auth/login', req);
  }

  @Get('profile')
  profile(@Headers('authorization') authHeader: string) {
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      return this.fakeStoreService.request('GET', '/auth/profile', null, token);
    }
  }
}
