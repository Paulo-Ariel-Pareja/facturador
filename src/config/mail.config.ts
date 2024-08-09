import { registerAs } from '@nestjs/config';

export default registerAs('emailConfig', () => ({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  user: process.env.MAIL_USER,
  pass: process.env.MAIL_PASSWORD,
  defaultMail: process.env.DEFAULT_MAIL_FROM,
  bcc: process.env.DEFAULT_MAIL_BCC,
}));
