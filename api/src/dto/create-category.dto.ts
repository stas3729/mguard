import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ type: String, description: 'Category name' })
  name: string;
  @ApiProperty({
    type: [Number],
    description: 'An array of expenses of category',
  })
  expenses: number[];
}
