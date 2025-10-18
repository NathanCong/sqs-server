import Router from '@koa/router';
import TestController from '@/controllers/TestController';
import AskStreamController from '@/controllers/AskStreamController';
import AnalysisSemanticsController from '@/controllers/AnalysisSemanticsController';

const router = new Router();

router.get('/test', TestController.index);

// 大模型 - 提问接口
router.post('/ask/stream', AskStreamController.index);
// 大模型 - 语义分析接口
router.post('/analysis/semantics', AnalysisSemanticsController.index);

export default router;
