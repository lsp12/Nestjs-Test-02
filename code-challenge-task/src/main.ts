import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import 'winston-mongodb';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = WinstonModule.createLogger({
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.timestamp(),
          winston.format.printf(
            ({
              timestamp,
              level,
              message,
            }: {
              timestamp: string;
              level: string;
              message: string;
            }) => {
              return `${timestamp} [${level}]: ${message}`;
            },
          ),
        ),
      }),
      new winston.transports.File({ filename: 'logs/app.log' }),
      new winston.transports.MongoDB({
        level: 'error',
        db: process.env.MONGODB_URI || 'mongodb://localhost:27018/logs',
        collection: 'log',
        options: { useUnifiedTopology: true },
      }),
    ],
  });

  const app = await NestFactory.create(AppModule, {
    logger,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Task Management API')
    .setDescription(
      'API for managing tasks, including features like task creation, update, deletion, and status tracking.',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
