const {
  RichEmbed
} = require('discord.js');

module.exports.run = async (client, message, args) => {
  const {
    prefix
  } = client.settings.get(message.guild.id);
  const hook = async (message) => {
    const webhook = await client.channels.get('455174684066185216').createWebhook(`${client.user.username} Bugs`, 'https://cdn.discordapp.com/attachments/454441590354608138/464087013402869771/utilidex_bug.jpg');
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
  if (!args[0]) return client.usage(message, prefix, 'bug');
  if (args.join(' ').length < 30) return client.argsError(client, message, 'Bug reports cannot be shorter than 30 characters.');
  message.delete();
  hook(message);
  return message.channel.send(`${client.emotes.check} Your bug report has been successfully sent to the bot developer to review.\nThank you for keeping ${client.user.username} bug free!`);
};

module.exports.conf = {
  enabled: true,
  reason: null,
  permission: 'SEND_MESSAGES',
  devOnly: false
};

module.exports.help = {
  name: "bug",
  category: "bot",
  description: "Spotted a bug with the bot? If so, this command will allow you to report the said bug to the bot developer.\n\n`Note: It's suggested that you also take screenshots of the bug and paste them when running the command.`",
  usage: "[prefix]bug <bug>",
  parameters: "stringBug",
  extended: false
};