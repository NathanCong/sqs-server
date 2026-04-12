import Router from '@koa/router';
import AssistantController from '@/controllers/AssistantController';
import UserController from '@/controllers/UserController';
import WanXiangController from '@/controllers/WanXiangController';

const router = new Router();

// 大模型 - 聊天接口（stream）
router.post('/assistant/chat/stream', AssistantController.chatStream);
// 大模型 - 专利交底书查新接口
router.post('/assistant/disclosure/search', AssistantController.searchDisclosure);
// 大模型 - 专利交底书撰写接口（stream）
router.post('/assistant/disclosure/helper/stream', AssistantController.helperDisclosureStream);
// 大模型 - 专利撰写接口（stream）
router.post('/assistant/patent/helper/stream', AssistantController.helperPatentStream);
// 大模型 - 专利改写接口（stream）
router.post(
  '/assistant/patent/rewrite/helper/stream',
  AssistantController.helperPatentRewriteStream
);

// 用户 - 注册
router.post('/user/register', UserController.register);
// 用户 - 登录
router.post('/user/login', UserController.login);
// 用户 - 评分
router.post('/user/poc', UserController.poc);
// 用户 - 获取个人信息
router.get('/user/info/get', UserController.getUserInfo);
// 用户 - 更新个人信息
router.post('/user/info/update', UserController.updateUserInfo);
// 用户 - 新增检索式
router.post('/user/expression/add', UserController.addExpression);
// 用户 - 获取检索式列表
router.get('/user/expression/list', UserController.getExpressionList);
// 用户 - 更新检索式
router.post('/user/expression/update', UserController.updateExpression);
// 用户 - 删除检索式
router.post('/user/expression/delete', UserController.deleteExpression);

// 万象云 - 检索专利 API
router.post('/wanxiang/patent/search', WanXiangController.searchPatents);
// 万象云 - 专利详情 - 基本信息 API
router.get('/wanxiang/patent/detail/basicinfo', WanXiangController.getPatentBasicInfo);
// 万象云 - 专利详情 - 说明书 API
router.get('/wanxiang/patent/detail/desc', WanXiangController.getPatentDesc);
// 万象云 - 专利详情 - 权利要求 API
router.get('/wanxiang/patent/detail/claim', WanXiangController.getPatentClaim);

export default router;
