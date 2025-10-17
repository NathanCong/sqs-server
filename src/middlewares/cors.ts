import type { Context } from 'koa';
import cors from '@koa/cors';

const { ALOW_ORIGINS } = process.env;

export default () =>
  cors({
    origin(ctx: Context) {
      const allowOrigins = ALOW_ORIGINS?.split(',') || [];
      const requestOrigin = ctx.get('Origin');
      // 请求源在白名单中
      if (requestOrigin && allowOrigins.includes(requestOrigin)) {
        return requestOrigin;
      }
      return '';
    },
    credentials: true,
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
  });
