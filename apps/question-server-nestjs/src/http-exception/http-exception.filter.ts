/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    // 1. 拿到「请求响应对象」
    const ctx = host.switchToHttp(); // 由于 Nest 支持 WS， RPC， HTTP，我们需要显式切换到 HTTP 上下文
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();
    const message = exception.message ?  exception.message : '服务器错误'

    // 3. 保持错误码规范返回
    response.status(status).json({ 
      errno: -1,
      message, 
      timestamp: new Date().toISOString(), // 错误发生的时间
      path: request.url
    });
  }
}