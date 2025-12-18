import Router from '@koa/router';
import ConsultStreamController from '@/controllers/ConsultStreamController';
import HelperDisclosureStreamController from '@/controllers/HelperDisclosureStreamController';
import HelperPatentStreamController from '@/controllers/HelperPatentStreamController';
import SearchPatentsController from '@/controllers/SearchPatentsController';
import SearchStrategyController from '@/controllers/SearchStrategyController';

const router = new Router();

// 大模型 - 专利撰写（新）
router.post('/helper/patent/stream', HelperPatentStreamController.index);
// 大模型 - 交底书撰写（新）
router.post('/helper/disclosure/stream', HelperDisclosureStreamController.index);
// 大模型 - 对话接口（新）
router.post('/consult/stream', ConsultStreamController.index);

// 大模型 - 检索策略接口（已经优化）
router.post('/search/strategy', SearchStrategyController.index);
// 万象云 - 检索专利接口（已经优化）
router.post('/search/patents', SearchPatentsController.index);

export default router;
