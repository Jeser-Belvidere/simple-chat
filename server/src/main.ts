import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { AuthGuard } from '@/common/guards/jwt.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //TODO: edite cors config for dev/production mode
  app.enableCors({
    origin: '*',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      //NOTE: returns 400 error if body not maches with DTO
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalGuards(new AuthGuard());

  await app.listen(parseInt(process.env.APP_PORT || '3000', 10), () => {
    console.log(`APP HAS BEEN STARTED ON PORT ${process.env.APP_PORT}`);
  });
}

bootstrap();
