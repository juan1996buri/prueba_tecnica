import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FakeStoreService } from 'src/fake-store/fake-store.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, FakeStoreService, ConfigService],
  imports: [HttpModule],
})
export class UsersModule {}
