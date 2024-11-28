import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './interfaces/category.interface';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PlayersService } from 'src/players/players.service';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
    private readonly playersService: PlayersService,
  ) {}

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const { category } = createCategoryDto;

    const foundCategory = await this.categoryModel.findOne({ category }).exec();

    if (foundCategory)
      throw new BadRequestException(`Categoria ${category} já cadastrada!`);

    const createdCategory = new this.categoryModel(createCategoryDto);

    return await createdCategory.save();
  }

  async getAllCategories(): Promise<Array<Category>> {
    return await this.categoryModel.find().populate('players').exec();
  }

  async getCategoryById(_id: string): Promise<Category> {
    const foundCategory = await this.categoryModel.findOne({ _id });

    if (!foundCategory)
      throw new NotFoundException('Categoria não encontrada!');

    return foundCategory;
  }
  async updateCategory(
    _id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<void> {
    const foundCategory = await this.categoryModel.findOne({ _id }).exec();

    if (!foundCategory)
      throw new NotFoundException('Categoria não encontrada!');

    await this.categoryModel
      .findOneAndUpdate({ _id }, { $set: updateCategoryDto })
      .exec();
  }

  async attachPlayerCategory(params: string[]): Promise<void> {
    const category = params['category'];
    const playerId = params['player_id'];

    const foundCategory = await this.categoryModel.findOne({ category }).exec();
    const playerOnCategory = await this.categoryModel
      .find({ category })
      .where('players')
      .in(playerId)
      .exec();

    if (!foundCategory)
      throw new BadRequestException('Categoria não encontrada');

    if (playerOnCategory.length > 0)
      throw new BadRequestException('Jogador já inserido na categoria!');

    foundCategory.players.push(playerId);
    await this.categoryModel.findOneAndUpdate(
      { category },
      { $set: foundCategory },
    );
  }
}
