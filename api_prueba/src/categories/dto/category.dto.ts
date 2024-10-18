import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUrl()
  @IsNotEmpty()
  image: string;
}

export class UpdateCategoryDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsUrl()
  @IsOptional()
  image: string;
}

export class FilterCategoriesDto {
  @IsNumber()
  @IsOptional()
  limit?: number;
}
