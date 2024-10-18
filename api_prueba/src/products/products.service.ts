import { Injectable } from '@nestjs/common';
import { FakeStoreService } from 'src/fake-store/fake-store.service';
import {
  CreateProductDto,
  FilterProductsDto,
  UpdateProductDto,
} from './dto/product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly fakeStoreService: FakeStoreService) {}

  async getAll(params: FilterProductsDto) {
    const { price, price_min, price_max, categoryId } = params;
    const queryParams: any = {};
    if (categoryId) queryParams.categoryId = categoryId;
    if (price_min) queryParams.price_min = price_min;
    if (price_max) queryParams.price_max = price_max;
    if (price) queryParams.price = price;
    const queryString = new URLSearchParams(queryParams).toString();
    const url = `/products${queryString ? `?${queryString}` : ''}`;
    return this.fakeStoreService.request('GET', url);
  }

  async findById(id: number) {
    return await this.fakeStoreService.request('GET', `/products/${id}`);
  }

  async update(id: number, changes: UpdateProductDto) {
    return await this.fakeStoreService.request(
      'PUT',
      `/products/${id}`,
      changes,
    );
  }

  async create(dto: CreateProductDto) {
    return await this.fakeStoreService.request('POST', '/products', dto);
  }

  async delete(id: number) {
    return await this.fakeStoreService.request('DELETE', `/products/${id}`);
  }

  async getRaw() {}
}
