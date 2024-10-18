import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FakeStoreService } from 'src/fake-store/fake-store.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, FakeStoreService, ConfigService],
  imports: [HttpModule],
})
export class AuthModule {}
