import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from 'src/auth/auth.service';
import { FakeStoreService } from 'src/fake-store/fake-store.service';
import { ProductsService } from 'src/products/products.service';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';

@Module({
  controllers: [CategoriesController],
  providers: [
    CategoriesService,
    FakeStoreService,
    ConfigService,
    ProductsService,
    AuthService,
  ],
  imports: [HttpModule],
})
export class CategoriesModule {}
