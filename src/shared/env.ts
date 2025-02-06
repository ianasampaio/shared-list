import { plainToInstance } from 'class-transformer';
import { IsString, validateSync } from 'class-validator';

class Env {
  @IsString()
  port: string;

  @IsString()
  jwtSecret: string;

  @IsString()
  databaseUrl: string;

  @IsString()
  mailgunKey: string;

  @IsString()
  mailgunUrl: string;

  @IsString()
  mailServiceFrom: string;

  @IsString()
  frontendUrl: string;
}

export const env: Env = plainToInstance(Env, {
  port: process.env.SERVER_PORT,
  jwtSecret: process.env.JWT_SECRET,
  databaseUrl: process.env.DATABASE_URL,
  mailgunKey: process.env.MAILGUN_KEY,
  mailgunUrl: process.env.MAILGUN_URL,
  mailServiceFrom: process.env.MAIL_SERVICE_FROM,
  frontendUrl: process.env.FRONTEND_URL,
});

const errors = validateSync(env);
console.log(errors);
