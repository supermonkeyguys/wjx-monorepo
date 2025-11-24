/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './transform/transform.interceptor';
import { HttpExceptionFilter } from './http-exception/http-exception.filter';
import * as bodyParser from 'body-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(bodyParser.json({ limit: '1mb' }))
  app.use(bodyParser.urlencoded({ limit: '1mb', extended: true }))

  // 路由全局前缀
  app.setGlobalPrefix('api')
  // 全局拦截器
  app.useGlobalInterceptors(new TransformInterceptor())
  // 全局拦截器
  app.useGlobalFilters(new HttpExceptionFilter())

  app.enableCors() // 跨域

  await app.listen(process.env.PORT ?? 3005);
}
bootstrap();
