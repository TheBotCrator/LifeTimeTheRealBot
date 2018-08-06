const Command = require('../base/command.js');
const { RichEmbed } = require('discord.js');

class Reason extends Command {
  constructor(client) {
    super(client, {
      name: 'reason',
      category: 'moderation',
      description: 'Edits the reason for a previous moderation case.',
      usage: '{prefix}reason <case number> <reason>',
      parameters: 'integerCaseNumber, stringReason',
      extended: false,
      enabled: true,
      reason: null,
      permission: 'KICK_MEMBERS',
      guildOnly: true,
      devOnly: false,
      aliases: []
    });
  };

  async run(message, args) {
    const { prefix, modLog } = this.client.settings.get(message.guild.id);
    if (!message.member.permissions.has('KICK_MEMBERS')) return this.client.permsError.member(this.client, message, 'KICK_MEMBERS');
    if (!args[0]) return this.client.usage(message, prefix, 'reason');
    const modlog = message.guild.channels.find(c => c.name === modLog) || message.guild.channels.get(modLog);
    if (!modlog) return;
    const caseNum = args[0].includes('#') ? args[0].split('#')[1] : args[0];
    const newReason = args.slice(1).join(' ');
    await modlog.fetchMessages({ limit: 100 }).then(messages => {
      const caseLog = messages.filter(m => m.author.id === this.client.user.id &&
        m.embeds[0] &&
        m.embeds[0].type === 'rich' &&
        m.embeds[0].footer &&
        m.embeds[0].footer.text.includes(`Case #${caseNum}`)
      ).first();
      if (!caseLog) return message.channel.send(`${this.client.emotes.x} I cannot find that case.`);
      modlog.fetchMessage(caseLog.id).then(msg => {
        const oldEmbed = msg.embeds[0];
        const color = oldEmbed.color;
        const authorName = oldEmbed.author.name;
        const authorAv = oldEmbed.author.iconURL;
        const desc = oldEmbed.description;
        const footer = oldEmbed.footer.text;
        const newEmbed = new RichEmbed()
          .setColor(color)
          .setAuthor(authorName, authorAv)
          .addField('Reason', newReason)
          .setFooter(footer)
          .setDescription(desc);
        msg.edit(newEmbed);
        return message.channel.send(`${this.client.emotes.check} Case \`${caseNum}\` has been successfully updated.`);
      });
    });
  };
};

module.exports = Reason;
