import Router from '@koa/router';
import TestController from '@/controllers/TestController';
import AskStreamController from '@/controllers/AskStreamController';
import AnalysisSemanticsController from '@/controllers/AnalysisSemanticsController';
import HelperTDDStreamController from '@/controllers/HelperTDDStreamController';
import HelperTPStreamController from '@/controllers/HelperTPStreamController';

const router = new Router();

router.get('/test', TestController.index);

// 大模型 - 提问接口
router.post('/ask/stream', AskStreamController.index);
// 大模型 - 语义分析接口
router.post('/analysis/semantics', AnalysisSemanticsController.index);
// 大模型 - 交底书撰写
router.post('/helper/tdd/stream', HelperTDDStreamController.index);
// 大模型 - 专利撰写
router.post('/helper/tp/stream', HelperTPStreamController.index);

export default router;
