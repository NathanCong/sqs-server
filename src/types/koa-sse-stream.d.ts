declare module 'koa-sse-stream' {
  import { Stream } from 'stream';

  interface SSEStreamOptions {
    keepAlive?: number;
  }

  class SSEStream extends Stream {
    constructor(options?: SSEStreamOptions);
    write(event: { event?: string; data: string }): void;
    end(): void;
  }

  export = SSEStream;
}
