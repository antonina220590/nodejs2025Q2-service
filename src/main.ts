import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // v-- 2. ДОБАВЬ ЭТИ ДВЕ СТРОКИ ДЛЯ ПРОВЕРКИ --v
  const configService = app.get(ConfigService);
  console.log(
    'My JWT Secret from ConfigService:',
    configService.get('JWT_SECRET_KEY'),
  );
  // ^-- ^

  await app.listen(4000);
}
bootstrap();
