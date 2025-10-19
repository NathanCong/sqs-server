import Router from '@koa/router';
import TestController from '@/controllers/TestController';
import AskStreamController from '@/controllers/AskStreamController';
import AnalysisSemanticsController from '@/controllers/AnalysisSemanticsController';
import HelperDisclosureStreamController from '@/controllers/HelperDisclosureStreamController';
import HelperPatentStreamController from '@/controllers/HelperPatentStreamController';
import SearchPatentsController from '@/controllers/SearchPatentsController';
import SearchStrategyController from '@/controllers/SearchStrategyController';

const router = new Router();

// api 测试接口
router.get('/test', TestController.index);

// 大模型 - 提问接口
router.post('/ask/stream', AskStreamController.index);
// 大模型 - 语义分析接口（已经优化）
router.post('/analysis/semantics', AnalysisSemanticsController.index);
// 大模型 - 交底书撰写接口
router.post('/helper/disclosure/stream', HelperDisclosureStreamController.index);
// 大模型 - 专利撰写接口
router.post('/helper/patent/stream', HelperPatentStreamController.index);
// 大模型 - 检索策略接口
router.post('/search/strategy', SearchStrategyController.index);
// 万象云 - 检索专利接口
router.post('/search/patents', SearchPatentsController.index);

export default router;
