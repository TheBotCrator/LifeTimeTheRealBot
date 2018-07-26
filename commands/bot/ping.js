const Command = require('../base/command.js');
const { RichEmbed } = require('discord.js');

class Ping extends Command {
  constructor(client) {
    super(client, {
      name: 'ping',
      category: 'bot',
      description: 'Checks the bot\'s latency and connection speed to the Discord API',
      usage: '{prefix}ping',
      parameters: 'None',
      extended: false,
      extended_help: null,
      enabled: true,
      reason: null,
      guildOnly: false,
      devOnly: false,
      permission: 'SEND_MESSAGES',
      cooldown: 5,
      aliases: ['pong', 'ding', 'p']
    });
  };

  async run(message, args) {
    const msg = await message.channel.send('Pinging...');
    const embed = new RichEmbed()
      .setColor(this.client.color)
      .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
      .setDescription(`Pong! It took me **${msg.createdTimestamp - message.createdTimestamp}**ms to edit that message!`)
      .addField(':heartbeat: Discord Hearbeat', `**${this.client.ping.toFixed()}**ms`);
    msg.edit(embed);
    console.log(this.help);
    console.log(this.conf);
  };
};

module.exports = Ping;