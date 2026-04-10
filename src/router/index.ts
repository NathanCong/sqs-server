import Router from '@koa/router';
import AssistantController from '@/controllers/AssistantController';
import UserController from '@/controllers/UserController';
import WanXiangController from '@/controllers/WanXiangController';

const router = new Router();

// 大模型 - 聊天接口（stream）
router.post('/assistant/chat/stream', AssistantController.chatStream);
// 大模型 - 专利交底书撰写（stream）
router.post('/assistant/helper/disclosure/stream', AssistantController.helperDisclosureStream);
// 大模型 - 专利改写（stream）
router.post(
  '/assistant/helper/patent/rewrite/stream',
  AssistantController.helperPatentRewriteStream
);
// 大模型 - 交底书查新接口
router.post('/assistant/search/disclosure', AssistantController.searchDisclosure);
// 大模型 - 专利撰写（stream）
router.post('/assistant/helper/patent/stream', AssistantController.helperPatentStream);

// 用户 - 注册
router.post('/user/register', UserController.register);
// 用户 - 登录
router.post('/user/login', UserController.login);
// 用户 - 评分
router.post('/user/poc', UserController.poc);

// 万象云 - 检索专利 API
router.post('/wanxiang/search/patents', WanXiangController.searchPatents);
// 万象云 - 专利详情 - 说明书 API
router.post('/wanxiang/getPatentManual', WanXiangController.getPatentManual);

export default router;
