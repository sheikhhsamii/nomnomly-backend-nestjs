import { Injectable, Logger } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CategoriesService {
  private logger = new Logger(CategoriesService.name);
  constructor(private readonly prismaService: PrismaService) {}
  async create(createCategoryDto: CreateCategoryDto, userId: number) {
    if (!userId) {
      throw new Error('User ID is required to create a category.');
    }
    const categories = await this.prismaService.categories.create({
      data: {
        name: createCategoryDto.name,
        description: createCategoryDto.description,
        userId: userId,
      },
    });
    this.logger.log(`Category created: ${JSON.stringify(categories)}`);
    return categories;
  }

  async findAll(userId: number) {
    const categories = await this.prismaService.categories.findMany({
      where: {
        userId,
      },
    });
    return categories;
  }

  findOne(id: number) {
    return this.prismaService.categories.findUnique({ where: { id: id } });
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category ${JSON.stringify(updateCategoryDto)}`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
