import { registerAs } from '@nestjs/config';

export default registerAs('appConfig', () => ({
  port: process.env.APP_PORT || 3001,
}));
