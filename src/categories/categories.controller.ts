import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './interfaces/category.interface';
import { CategoriesService } from './categories.service';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('api/v1/category')
export class CategoriesController {
  constructor(private readonly categoryService: CategoriesService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return await this.categoryService.createCategory(createCategoryDto);
  }

  @Get()
  async getCategories(): Promise<Array<Category>> {
    return await this.categoryService.getAllCategories();
  }

  @Get('/:_id')
  async getCategoryById(@Param('_id') _id: string): Promise<Category> {
    return await this.categoryService.getCategoryById(_id);
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async updateCategory(
    @Param('_id') _id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<void> {
    await this.categoryService.updateCategory(_id, updateCategoryDto);
    return;
  }

  @Post('/:category/players/:player_id')
  async attachPlayerCategory(@Param() params: string[]): Promise<void> {
    return await this.categoryService.attachPlayerCategory(params);
  }
}
