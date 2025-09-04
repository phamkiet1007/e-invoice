import { BaseConfiguration } from '@common/configuration/base.config';
import { AppConfiguration } from '@common/configuration/app.config';

class Configuration extends BaseConfiguration {
  //extend thì bên main.ts có thể . thẳng từ CONFIGURATION để gọi các biến
  APP_CONFIG = new AppConfiguration(); //tạo biến như này thì phải . APP_CONFIG.PORT bên main.ts
}

export const CONFIGURATION = new Configuration();

export type TConfiguration = typeof CONFIGURATION;
