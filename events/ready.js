class Ready {
  constructor(client) {
    this.client = client;
  };

  async run() {
    console.log(this.client.chalk.bgBlack.greenBright(`${this.client.user.tag} logged in with ${this.client.guilds.size} guilds.`));
    this.client.user.setActivity('for $help | @Utilidex help', { type: 'WATCHING' });
  };
};

module.exports = Ready;
