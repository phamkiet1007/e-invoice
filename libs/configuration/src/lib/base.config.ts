import { IsBoolean, IsNotEmpty, IsString, validateSync } from 'class-validator';
import { Logger } from '@nestjs/common';

export class BaseConfiguration {
  @IsString()
  NODE_ENV: string;

  @IsBoolean()
  IS_DEV: boolean;

  @IsString()
  @IsNotEmpty()
  GLOBAL_PREFIX: string;

  constructor() {
    this.NODE_ENV = process.env['NODE_ENV'] || 'development';
    this.IS_DEV = this.NODE_ENV === 'development';
    this.GLOBAL_PREFIX = process.env['GLOBAL_PREFIX'] || 'api/v1';
  }

  validate() {
    // This method can be used to trigger validation manually if needed
    const errors = validateSync(this);
    if (errors.length > 0) {
      const errorMessages = errors.map((err) => {
        return err.children && err.children.length > 0;
      });

      Logger.error(errorMessages, errors);

      throw new Error('Configuration validation failed');
    }
  }
}
