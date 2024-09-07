import { CreateCategoryDto } from './create-category.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMonthDto {
  @ApiProperty({
    description: 'Name of month you want to create',
    type: String,
  })
  name: string;
  @ApiProperty({ description: 'Year', type: Number })
  year: number;
  @ApiProperty({ description: 'Income in month', type: Number })
  income: number;
  @ApiProperty({ description: 'Categories in month' })
  categories: CreateCategoryDto[];
}
