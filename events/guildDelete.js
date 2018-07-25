class Delete {
  constructor(client) {
    this.client = client;
  };

  async run(guild) {
    this.client.settings.delete(guild.id);
    this.client.cases.set(guild.id);
  };
};

module.exports = Delete;
