const { RichEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
  const { prefix } = client.settings.get(message.guild.id);
  if (!message.member.permissions.has('MANAGE_CHANNELS')) return client.permsError.member(client, message, 'MANAGE_CHANNELS');
  if (!message.guild.me.permissions.has('MANAGE_CHANNELS')) return client.permsError.bot(client, message, 'MANAGE_CHANNELS');
  if (!args[0]) return client.usage(message, prefix, 'makechannel');
  const type = args[0];
  if (type !== 'text' && type !== 'voice' && type !== 'category') {
    return message.delete(), message.channel.send(`${client.emotes.x} Channel types can only be 'text', 'voice', or 'category'.`);
  };
  let name = args[1];
  if (!name) name = 'no-name-provided';
  message.delete();
  try {
    await message.guild.createChannel(name, type);
  } catch (e) {
    return message.channel.send(`${client.emotes.x} \`${e.message}\``);
  };
  return message.channel.send(`${client.emotes.check} Successfully made the \`${type}\` channel '\`${name}\`'`);
};

module.exports.conf = {
  enabled: true,
  reason: null,
  permission: 'MANAGE_CHANNELS',
  devOnly: false
};

module.exports.help = {
  name: 'makechannel',
  category: 'utility',
  description: 'Creates a new voice, text, or category channel.',
  usage: '[prefix]makechannel <voice|text|category> <name>',
  parameters: 'stringType, stringName',
  extended: false
};
