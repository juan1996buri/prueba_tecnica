import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FakeStoreService } from './fake-store.service';

@Module({
  controllers: [],
  providers: [FakeStoreService],
  imports: [HttpModule, ConfigModule],
})
export class FakeStoreModule {}
