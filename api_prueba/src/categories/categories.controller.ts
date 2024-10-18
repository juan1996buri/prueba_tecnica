import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { AuthService } from 'src/auth/auth.service';
import { CategoriesService } from './categories.service';
import {
  CreateCategoryDto,
  FilterCategoriesDto,
  UpdateCategoryDto,
} from './dto/category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(
    private categoriesService: CategoriesService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  async getAll(
    @Headers('authorization') authHeader: string,
    @Query() params: FilterCategoriesDto,
  ) {
    await this.authService.verifyProfile(authHeader);
    return this.categoriesService.getAll(params);
  }

  @Get(':id')
  async getOne(
    @Headers('authorization') authHeader: string,
    @Param('id', ParseIntPipe) id: number,
  ) {
    await this.authService.verifyProfile(authHeader);
    return await this.categoriesService.findById(id);
  }

  @Post()
  async create(
    @Headers('authorization') authHeader: string,
    @Body() category: CreateCategoryDto,
  ) {
    await this.authService.verifyProfile(authHeader);
    return await this.categoriesService.create(category);
  }

  @Put(':id')
  async update(
    @Headers('authorization') authHeader: string,
    @Param('id', ParseIntPipe) id: number,
    @Body() changes: UpdateCategoryDto,
  ) {
    await this.authService.verifyProfile(authHeader);
    return this.categoriesService.update(id, changes);
  }

  @Delete(':id')
  async delete(
    @Headers('authorization') authHeader: string,
    @Param('id', ParseIntPipe) id: number,
  ) {
    await this.authService.verifyProfile(authHeader);
    return this.categoriesService.delete(id);
  }
}
