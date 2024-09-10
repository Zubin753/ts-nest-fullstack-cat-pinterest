import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Тестовое задание fullstack')
    .setDescription('Документация REST API')
    .setVersion('1.0.0')
    .addTag('Zubin753')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.enableCors({
    origin: 'http://localhost:8080', // Укажите разрешенные домены
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Если необходимо
  });
  await app.listen(3000, () => console.log('Сервер запущен на порту 3000'));
}
bootstrap();
