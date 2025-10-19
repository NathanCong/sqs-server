export default class TestService {
  static test() {
    return Promise.resolve({ message: 'This is a test api.' });
  }

  static async index() {
    return await TestService.test();
  }
}
