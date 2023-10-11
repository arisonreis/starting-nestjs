import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { InvalidRelationError } from '../errors/invalid-relation.error';

@Catch(InvalidRelationError)
export class InvalidRelatioExceptionFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    return response.status(422).json({
      statusCode: 422,
      message: exception.message,
    });
  }
}
