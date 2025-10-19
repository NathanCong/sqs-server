/**
 * 格式化成功响应
 */
export function formatSuccessResponse(data: unknown) {
  return { code: 200, data, message: '处理成功', success: true };
}

/**
 * 格式化错误响应
 */
export function formatFailureResponse(message: string) {
  return { code: 0, data: null, message, success: false };
}
