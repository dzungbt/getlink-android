/**
 * Abstract Class BaseProvider.
 *
 * @class BaseProvider
*/
class BaseProvider {
  constructor() { }
  async getRedisToken() {}

  async setRedisToken() {}

  async renewToken(){}
  
  async checkTokenRequest() { }

  async getTokenRequest() { }

  async getLink(channelId) {}

  async getM3u8Request(id) { }
}

module.exports = {
  BaseProvider: BaseProvider,
};
