import { Injectable } from '@nestjs/common';

import { FakeStoreService } from 'src/fake-store/fake-store.service';
import {
  CreateCategoryDto,
  FilterCategoriesDto,
  UpdateCategoryDto,
} from './dto/category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly fakeStoreService: FakeStoreService) {}

  async getAll(params: FilterCategoriesDto) {
    const { limit } = params;

    if (limit !== undefined) {
      return await this.fakeStoreService.request(
        'GET',
        `/categories/${params}`,
      );
    } else {
      return await this.fakeStoreService.request('GET', '/categories');
    }
  }

  async findById(id: number) {
    return await this.fakeStoreService.request('GET', `/categories/${id}`);
  }

  async create(dto: CreateCategoryDto) {
    return await this.fakeStoreService.request('POST', '/categories', dto);
  }

  async update(id: number, changes: UpdateCategoryDto) {
    return await this.fakeStoreService.request(
      'PUT',
      `/categories/${id}`,
      changes,
    );
  }

  async delete(id: number) {
    return await this.fakeStoreService.request('DELETE', `/categories/${id}`);
  }
}
