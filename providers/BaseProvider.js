/**
 * Abstract Class BaseProvider.
 *
 * @class BaseProvider
 */
class BaseProvider {
  constructor() {}

  async checkTokenRequest() {}

  async getTokenRequest() {}

  async getM3u8ById() {}
}

module.exports = {
  BaseProvider: BaseProvider,
};
