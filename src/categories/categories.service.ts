import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prismaService: PrismaService) {}

  create(createCategoryDto: CreateCategoryDto) {
    return this.prismaService.category.create({
      data: {
        name: createCategoryDto.name,
        description: createCategoryDto.description,
      },
    });
  }

  findAll() {
    return this.prismaService.category.findMany();
  }

  findOne(id: string) {
    return this.prismaService.category.findFirstOrThrow({
      where: {
        id: id,
      },
    });
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    // update
    return this.prismaService.category.update({
      where: {
        id: id,
      },
      data: {
        name: updateCategoryDto.name,
        description: updateCategoryDto.description,
      },
    });
  }

  remove(id: string) {
    this.prismaService.category.delete({
      where: {
        id: id,
      },
    });
    return true;
  }
}
