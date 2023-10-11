import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateVideoDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  category_id: string;
}
