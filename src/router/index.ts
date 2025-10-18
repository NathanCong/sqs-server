import Router from '@koa/router';
import TestController from '@/controllers/TestController';
import AskStreamController from '@/controllers/AskStreamController';
import AnalysisSemanticsController from '@/controllers/AnalysisSemanticsController';
import HelperDisclosureStreamController from '@/controllers/HelperDisclosureStreamController';
import HelperPatentStreamController from '@/controllers/HelperPatentStreamController';

const router = new Router();

router.get('/test', TestController.index);

// 大模型 - 提问接口
router.post('/ask/stream', AskStreamController.index);
// 大模型 - 语义分析接口
router.post('/analysis/semantics', AnalysisSemanticsController.index);
// 大模型 - 交底书撰写
router.post('/helper/disclosure/stream', HelperDisclosureStreamController.index);
// 大模型 - 专利撰写
router.post('/helper/patent/stream', HelperPatentStreamController.index);

export default router;
