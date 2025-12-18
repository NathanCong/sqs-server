import '@/env';
import Koa from 'koa';
import cors from '@/middlewares/cors';
import bodyParser from 'koa-bodyparser';
import router from '@/router';

// 创建 koa 实例
const app = new Koa();

// 应用中间件
app.use(cors());
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

// 启动服务
const { SERVICE_HOST, SERVICE_PORT } = process.env;
app.listen(Number(SERVICE_PORT), SERVICE_HOST, () => {
  console.log(`\nServer is running at http://${SERVICE_HOST}:${SERVICE_PORT}`);
});
