import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaExceptionFilter } from './exceptions-filter/prisma.exception-filter';
import { ValidationPipe } from '@nestjs/common';
import { InvalidRelatioExceptionFilter } from './exceptions-filter/invalid-relation.exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(
    new PrismaExceptionFilter(),
    new InvalidRelatioExceptionFilter(),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422,
    }),
  );
  await app.listen(4000);
}
bootstrap();
