import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { PrismaService } from '../prisma/prisma.service';
import { InvalidRelationError } from '../errors/invalid-relation.error';

@Injectable()
export class VideosService {
  constructor(private prismaservice: PrismaService) {}

  async create(createVideoDto: CreateVideoDto) {
    const categoryExists = await this.prismaservice.category.count({
      where: {
        id: createVideoDto.category_id,
      },
    });

    if (!categoryExists) {
      throw new InvalidRelationError('Category not found');
    }

    return this.prismaservice.video.create({
      data: {
        title: createVideoDto.title,
        description: createVideoDto.description,
        category_id: createVideoDto.category_id,
        file_path: 'fake/video.mp4',
      },
    });
  }

  findAll() {
    return this.prismaservice.video.findMany();
  }

  findOne(id: string) {
    return this.prismaservice.video.findFirstOrThrow({
      where: {
        id: id,
      },
    });
  }

  update(id: string, updateVideoDto: UpdateVideoDto) {
    return this.prismaservice.video.update({
      where: {
        id: id,
      },
      data: {
        title: updateVideoDto.title,
        description: updateVideoDto.description,
      },
    });
  }

  remove(id: string) {
    return this.prismaservice.video.delete({
      where: {
        id: id,
      },
    });
  }
}
