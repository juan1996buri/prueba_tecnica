import {
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsAlphanumeric()
  @IsNotEmpty()
  @MinLength(4)
  password: string;

  @IsOptional()
  role: string;

  @IsUrl()
  @IsNotEmpty()
  avatar: string;
}

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsAlphanumeric()
  @MinLength(4)
  @IsOptional()
  password: string;

  @IsOptional()
  role: string;

  @IsUrl()
  @IsOptional()
  avatar: string;
}

export class ValidateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class FilterUsersDto {
  @IsNumber()
  @IsOptional()
  limit?: number;
}
