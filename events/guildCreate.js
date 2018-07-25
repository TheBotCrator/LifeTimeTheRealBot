class Create {
  constructor(client) {
    this.client = client;
  };

  async run(guild) {
    this.client.settings.set(guild.id, this.client.defaultSettings);
    this.client.cases.set(guild.id, this.client.defaultCases);
  };
};

module.exports = Create;
