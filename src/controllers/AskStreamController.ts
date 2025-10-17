import type { Context } from 'koa';
import AssistantService from '@/services/AssistantService';
import { PassThrough } from 'stream';

export default class AskStreamController {
  static index(ctx: Context) {
    // 设置 SSE 响应头
    ctx.set('Content-Type', 'text/event-stream');
    ctx.set('Cache-Control', 'no-cache');
    ctx.set('Connection', 'keep-alive');

    // 创建一个可写流来控制响应
    const stream = new PassThrough();

    // 返回可写流
    ctx.body = stream;

    // 处理数据流
    const requestParams = ctx.request.body as AskStreamRequestParams;
    const onChunk = (chunk: Buffer) => stream.write(chunk.toString('utf-8'));
    AssistantService.askStream(requestParams, onChunk)
      .catch(err => {
        console.error('\nRequest error:', err);
      })
      .finally(() => {
        stream.end();
      });
  }
}
