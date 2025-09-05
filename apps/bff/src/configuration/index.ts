import { BaseConfiguration } from '@common/configuration/base.config';
import { AppConfiguration } from '@common/configuration/app.config';
import { Validate, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class Configuration extends BaseConfiguration {
  //extend thì bên main.ts có thể . thẳng từ CONFIGURATION để gọi các biến

  @ValidateNested()
  @Type(() => AppConfiguration)
  APP_CONFIG = new AppConfiguration(); //tạo biến như này thì phải . APP_CONFIG.PORT bên main.ts
}

export const CONFIGURATION = new Configuration();

export type TConfiguration = typeof CONFIGURATION;

CONFIGURATION.validate();
