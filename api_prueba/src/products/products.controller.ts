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
import {
  CreateProductDto,
  FilterProductsDto,
  UpdateProductDto,
} from './dto/product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  async getAll(
    @Headers('authorization') authHeader: string,
    @Query() params: FilterProductsDto,
  ) {
    await this.authService.verifyProfile(authHeader); // Verificar el token
    return await this.productsService.getAll(params);
  }

  @Get(':id')
  async getProduct(
    @Headers('authorization') authHeader: string,
    @Param('id', ParseIntPipe) id: number,
  ) {
    await this.authService.verifyProfile(authHeader); // Verificar el token
    return await this.productsService.findById(id);
  }

  @Post()
  async create(
    @Headers('authorization') authHeader: string,
    @Body() product: CreateProductDto,
  ) {
    await this.authService.verifyProfile(authHeader); // Verificar el token
    return await this.productsService.create(product);
  }

  @Put(':id')
  async update(
    @Headers('authorization') authHeader: string,
    @Param('id', ParseIntPipe) id: number,
    @Body() changes: UpdateProductDto,
  ) {
    await this.authService.verifyProfile(authHeader); // Verificar el token
    return await this.productsService.update(id, changes);
  }

  @Delete(':id')
  async delete(
    @Headers('authorization') authHeader: string,
    @Param('id', ParseIntPipe) id: number,
  ) {
    await this.authService.verifyProfile(authHeader); // Verificar el token
    return await this.productsService.delete(id);
  }
}
