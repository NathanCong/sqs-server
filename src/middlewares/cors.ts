import type { Context } from 'koa';
import cors from '@koa/cors';

function getAllowOrigins() {
  return process.env.ALLOW_ORIGINS?.split(',') || [];
}

export default () =>
  cors({
    origin(ctx: Context) {
      const allowOrigins = getAllowOrigins();
      const requestOrigin = ctx.get('Origin');
      // 请求源在白名单中
      if (requestOrigin && allowOrigins.includes(requestOrigin)) {
        return requestOrigin;
      }
      // 请求源不在白名单中
      return '';
    },
    credentials: true,
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
  });
