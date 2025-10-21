import * as fs from 'fs';
import * as path from 'path';

export default class FileService {
  static async ensureDirectory(directory: string): Promise<void> {
    try {
      await fs.promises.access(directory);
    } catch {
      await fs.promises.mkdir(directory, { recursive: true });
    }
  }

  static async generateJsonFile(directory: string, fileName: string, jsonString: string) {
    try {
      // 确保目录存在
      await FileService.ensureDirectory(directory);

      const filePath = path.join(directory, fileName);

      // 方法1: 使用 JSON.stringify
      await fs.promises.writeFile(filePath, jsonString, 'utf8');

      return filePath;
    } catch (err) {
      throw err;
    }
  }

  static async cleanJsonFile(directory: string, fileName: string) {
    try {
      // 确保目录存在
      await FileService.ensureDirectory(directory);

      const filePath = path.join(directory, fileName);

      // 删除文件
      await fs.promises.unlink(filePath);
    } catch (err) {
      // throw err;
      console.warn(err);
    }
  }

  static async readJsonFile(directory: string, fileName: string) {
    try {
      // 确保目录存在
      await FileService.ensureDirectory(directory);

      const filePath = path.join(directory, fileName);

      // 读取文件
      const data = await fs.promises.readFile(filePath, 'utf8');

      // 解析 JSON 数据
      const jsonData = JSON.parse(data);

      return jsonData;
    } catch (err) {
      // throw err;
      console.warn(err);
    }
  }
}
