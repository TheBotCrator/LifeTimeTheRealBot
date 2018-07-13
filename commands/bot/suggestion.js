const { RichEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
  const { prefix } = client.settings.get(message.guild.id);
  const hook = async (message) => {
    const webhook = await client.channels.get('455167443174948894').createWebhook(`${client.user.username} Suggestions`, 'https://cdn.discordapp.com/attachments/454441590354608138/464093168267427840/utilidex_suggestion.jpg');
    const embed = new RichEmbed()
      .setColor('GREEN')
      .setAuthor(message.author.username, message.author.displayAvatarURL)
      .setTitle('New Suggestion')
      .addField('Suggested By', `${message.author.tag} (\`${message.author.id}\`)`, true)
      .addField('Suggested In', `${message.guild.name} (\`${message.guild.id}\`)`, true)
      .setDescription(`\`\`\`${args.join(' ')}\`\`\``)
      .setFooter(`Suggested from #${message.channel.name}`, message.guild.iconURL)
      .setTimestamp();
    await webhook.send(embed);
  };
  if (!args[0]) return client.usage(message, prefix, 'suggestion');
  if (args.join(' ').length < 30) return client.argsError(client, message, 'Suggestions cannot be shorter than 30 characters.');
  message.delete();
  hook(message);
  return message.channel.send(`${client.emotes.check} Your suggestion has been successfully sent to the bot developer to review.`);
};

module.exports.conf = {
  enabled: true,
  reason: null,
  permission: 'SEND_MESSAGES',
  devOnly: false
};

module.exports.help = {
  name: "suggestion",
  category: "bot",
  description: "Sends a suggestion to the bot developer to review and possibly add.",
  usage: "[prefix]suggestion <suggestion>",
  parameters: "stringSuggestion",
  extended: false
};
