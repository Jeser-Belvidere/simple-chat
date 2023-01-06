import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      //NOTE: returns 400 error if body not maches with DTO
      // forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(parseInt(process.env.APP_PORT || '3000', 10), () => {
    console.log(`APP HAS BEEN STARTED ON PORT ${process.env.APP_PORT}`);
  });
}

bootstrap();
