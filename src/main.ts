import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';


const PORT = process.env.PORT || 7921


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin:
        ['https://localhost:5173/', 'https://bbf2-91-149-142-24.ngrok-free.app', 'https://time-to-futures-tma.vercel.app'],
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization'],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    }
  });
  console.log(`we are listen port ${PORT}`);

  app.use(cookieParser());

  app.setGlobalPrefix('v0.0.1');
  const config = new DocumentBuilder()
    .setTitle('anti social social punks club')
    .setDescription('this application servs a lot of buisenes guys who want look my job, and who want use or comunicate with my API')
    .setVersion('1.0.0').addTag('PinkPunk')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/v1/docs', app, document)
  await app.listen(PORT);
}
bootstrap();
