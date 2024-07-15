import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ResponseTransformInterceptor } from '@modules/lib/interceptors/responseTransform.interceptor';
import { CustomValidationPipe } from '@modules/lib/pipes/customValidation.pipe';
import { AppModule } from './app.module';
import { Log } from './shared';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('GYG AdminSphere')
    .setDescription('The GYG AdminSphere APIs')
    .setVersion('1.0')
    .addTag('gyg')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // App settings
  app.useGlobalInterceptors(new ResponseTransformInterceptor());
  app.useGlobalPipes(new CustomValidationPipe());
  app.enableCors();
  Log.logInit();

  await app.listen(3000);
}
bootstrap();
