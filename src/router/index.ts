import Router from '@koa/router';
import TestController from '@/controllers/TestController';
import AskStreamController from '@/controllers/AskStreamController';

const router = new Router();

router.get('/test', TestController.index);

router.post('/ask/stream', AskStreamController.index);

export default router;
