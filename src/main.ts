import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { extname, join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import * as hbs from 'express-handlebars';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname,'..','public'));
  app.setBaseViewsDir(join(__dirname,'..','views'));
  app.engine('hbs',hbs({
    extname: 'hbs',
    partialsDir:join(__dirname,'..','views/partials')
  }));
  app.setViewEngine('hbs')
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    })
  )
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

/*
  npm install --save @nest/typeorm typeorm mysql2
  npm i --save class-validator class-transformer
  npm install --save hbs
  npm install --save express-handleebars@^5.3.0 @types/express-handlebars@^5.3.0

*/