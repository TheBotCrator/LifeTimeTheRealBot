class Error {
  constructor(client) {
    this.client = client;
  };

  async run(error) {
    return console.log(error);
  };
};

module.exports = Error;
