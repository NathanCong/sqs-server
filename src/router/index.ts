import Router from '@koa/router';
import TestController from '@/controllers/TestController';

const router = new Router();

router.get('/test', TestController.index);

export default router;
