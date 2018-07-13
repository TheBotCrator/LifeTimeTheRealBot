const { RichEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
  const { prefix } = client.settings.get(message.guild.id);
  if (!args[0]) return client.usage(message, prefix, 'emote');
  let emote = message.content.split(':')[1].toLowerCase() || args[0].toLowerCase();
  emote = message.guild.emojis.find(e => e.name.toLowerCase() === emote);
  if (!emote) return message.channel.send(`${client.emotes.x} It seems that emote does not exist on this server.`);
  const name = emote.name;
  const animated = emote.animated ? client.emotes.check : client.emotes.x;
  const createdAt = client.moment(emote.createdAt).format('dddd, MMMM Do, YYYY, hh:mm:ss A');
  const id = emote.id;
  const identifier = emote.identifier;
  const embed = new RichEmbed()
    .setColor(client.color)
    .setAuthor(message.guild.name, message.guild.iconURL)
    .setThumbnail(emote.url)
    .addField('Name', `\`:${name}:\``, true)
    .addField('ID', id, true)
    .addField('Created On', createdAt, true)
    .addField('Animated', animated, true)
    //.addField('Identifier', `\`<${identifier}>\``, true)
  return message.channel.send(embed);
};

module.exports.conf = {
  enabled: true,
  reason: null,
  permission: 'SEND_MESSAGES',
  devOnly: false
};

module.exports.help = {
  name: 'emote',
  category: 'UTILITY',
  description: 'Returns information about a custom emote in the guild.',
  usage: '[prefix]emote :<emote>:',
  parameters: 'snowflakeGuildEmoji',
  extended: false
};
