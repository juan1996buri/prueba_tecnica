import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  Min,
  ValidateIf,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsPositive()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  categoryId: number;

  @IsArray()
  @IsUrl({}, { each: true })
  @IsNotEmpty()
  @ArrayMinSize(1)
  images: string;
}

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsPositive()
  @IsOptional()
  price: number;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  @IsOptional()
  categoryId: number;

  @IsArray()
  @IsUrl({}, { each: true })
  @IsOptional()
  @ArrayMinSize(1)
  images: string;
}

export class FilterProductsDto {
  @IsNumber()
  @IsOptional()
  limit: number;

  @IsNumber()
  @IsOptional()
  offset: number;

  @IsOptional()
  price: number;

  @IsOptional()
  @Min(0)
  price_min: number;

  @ValidateIf((params) => params.minPrice)
  @IsPositive()
  price_max: number;

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsNumber()
  categoryId: number;
}
