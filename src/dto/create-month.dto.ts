import { CreateCategoryDto } from './create-category.dto';

export class CreateMonthDto {
  name: string;
  year: number;
  income: number;
  categories: CreateCategoryDto[];
}
