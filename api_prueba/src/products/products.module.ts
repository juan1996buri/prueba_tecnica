import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from 'src/auth/auth.service';
import { FakeStoreService } from 'src/fake-store/fake-store.service';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  controllers: [ProductsController],
  imports: [HttpModule], // Aquí importas el HttpModule
  providers: [FakeStoreService, ConfigService, ProductsService, AuthService],
})
export class ProductsModule {}
