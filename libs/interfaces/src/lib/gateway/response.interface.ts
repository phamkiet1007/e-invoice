import { HttpStatus } from '@nestjs/common';
import { HTTP_MESSAGE } from '@common/constants/enums/http-message.enum';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto<T> {
  @ApiProperty({ type: String })
  message = HTTP_MESSAGE.OK;

  @ApiProperty()
  data?: T;

  @ApiProperty()
  processId?: string;

  @ApiProperty()
  statusCode = HttpStatus.OK;

  @ApiProperty()
  duration?: string;

  constructor(data: Partial<ResponseDto<T>>) {
    Object.assign(this, data); // gán các thuộc tính từ data vào instance hiện tại
  }
}
