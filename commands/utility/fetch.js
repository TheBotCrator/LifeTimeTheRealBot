const { RichEmbed, Util } = require('discord.js');

module.exports.run = async (client, message, args) => {
  const { prefix } = client.settings.get(message.guild.id);
  if (!args[0]) return client.usage(message, prefix, 'fetch');
  if (isNaN(parseInt(args[0])) || args[0].length !== 18) return client.argsError(client, message, '\nEither the ID provided contains characters that are not numbers, or the provided ID is not 18 characters in length.');
  const msg = await message.channel.fetchMessage(args[0]).catch((e) => { return client.argsError(client, message, e.message)});
  const embed = new RichEmbed()
    .setColor(msg.member.highestRole.hexColor)
    .setAuthor(msg.author.username, msg.author.displayAvatarURL)
    .setDescription(`» Sent At: **${client.moment(msg.createdAt).format('dddd, MMMM Do, YYYY, hh:mm:ss A')}**`)
    .addField('Message Content', `\`\`\`${Util.escapeMarkdown(msg.content, false)}\`\`\``)
    .setFooter(`Message ID: ${msg.id}`, message.author.displayAvatarURL);
  return message.channel.send(embed);
};

module.exports.conf = {
  enabled: true,
  reason: null,
  permission: 'SEND_MESSAGES',
  devOnly: false,
  guildOnly: true,
  cooldown: 5
};

module.exports.help = {
  name: 'fetch',
  category: 'utility',
  description: 'Fetches message details via a message ID.',
  usage: '[prefix]fetch <message ID>',
  parameters: 'integerID',
  extended: 'The command must be executed in the channel the message ID is in.'
};
