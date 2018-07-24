const { RichEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
  if (message.guild.emojis.size < 1) return message.channel.send(`${client.emotes.x} It seems there's no custom emotes on this server.`);
  const embed = new RichEmbed()
    .setColor(client.color)
    .setAuthor(message.guild.name, message.guild.iconURL)
    .setTitle(`Custom Emotes for ${message.guild.name}`)
    .setDescription(message.guild.emojis.map(e => `${e} - \`:${e.name}:\``).join('\n'));
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
  name: 'emotes',
  category: 'utility',
  description: 'Displays the custom emotes for the current guild.',
  usage: '[prefix]emotes',
  parameters: 'None',
  extended: false
};
