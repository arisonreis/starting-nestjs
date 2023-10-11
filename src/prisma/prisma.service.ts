import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
// OnmoduleInit => Roda quando o projeto subir e tenta a conexão com o banco (neste caso)
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    try {
      await this.$connect();
    } catch (err) {
      throw new Error('Database connection failed');
    }
  }
}
