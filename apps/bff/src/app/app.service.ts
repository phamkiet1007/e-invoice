import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getData(): { message: string } {
    // throw new BadRequestException('This is a bad request exception');

    return { message: 'Hello API' };
  }
}
