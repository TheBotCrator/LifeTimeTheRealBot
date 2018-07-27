const Command = require('../base/command.js');
const { RichEmbed } = require('discord.js');

class Bug extends Command {
  constructor(client) {
    super(client, {
      name: 'bug',
      category: 'bot',
      description: 'Sends a bug report for the bot developer to review.',
      usage: '{prefix}bug <bug>',
      parameters: 'stringBug',
      extended: false,
      enabled: true,
      reason: null,
      permission: 'SEND_MESSAGES',
      guildOnly: true,
      devOnly: false,
      cooldown: 10,
      aliases: []
    });
  };

  async run(message, args) {
    const { prefix } = this.client.settings.get(message.guild.id);
    const hook = async (message) => {
      const webhook = await this.client.channels.get('455174684066185216').createWebhook(`${this.client.user.username} Bugs`, 'https://cdn.discordapp.com/attachments/454441590354608138/464087013402869771/utilidex_bug.jpg');
      const embed = new RichEmbed()
        .setColor('RED')
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        .setTitle('Bug Report')
        .addField('Reported By', `${message.author.tag} (\`${message.author.id}\`)`, true)
        .addField('Reported In', `${message.guild.name} (\`${message.guild.id}\`)`, true)
        .setDescription(`\`\`\`${args.join(' ')}\`\`\``)
        .setFooter(`Reported from #${message.channel.name}`, message.guild.iconURL)
        .setTimestamp();
      await webhook.send(embed);
    };
    if (!args[0]) return this.client.usage(message, prefix, 'bug');
    if (args.join(' ').length < 30) return this.client.argsError(this.client, message, 'Bug reports cannot be shorter than 30 characters.');
    message.delete();
    hook(message);
    return message.channel.send(`${this.client.emotes.check} Your bug report has been successfully sent to the bot developer to review.\nThank you for keeping ${this.client.user.username} bug free!`);
  };
};

module.exports = Bug;
