const { RichEmbed, Util } = require('discord.js');

module.exports.run = async (client, message, args) => {
  const { prefix } = client.settings.get(message.guild.id);
  if (!args[0]) return client.usage(message, prefix, 'find');
  if (isNaN(parseInt(args[0])) || args[0].length !== 18) return client.argsError(client, message, 'Either the ID provided contains characters that are not numbers, or the provided ID is not 18 characters in length.');
  const user = await client.fetchUser(args[0]);
  if (!user) return client.argsError(client, message, 'Unknown User.');
  let status;
  if (user.presence.status === 'online') {
    status = `<:utilidexOnline:466475765207138315>ONLINE`;
  } else if (user.presence.status === 'idle') {
    status = `<:utilidexIdle:466475764087521292>IDLE`;
  } else if (user.presence.status === 'dnd') {
    status = `<:utilidexDND:466475824359407626>DND`;
  } else if (user.presence.status === 'streaming') {
    status = `<:utilidexStreaming:466476812071862283>STREAMING`;
  } else if (user.presence.status === 'offline') {
    status = `<:utilidexOffline:466475764418871298>OFFLINE`;
  };
  const embed = new RichEmbed()
    .setColor(client.color)
    .setAuthor(user.username, user.displayAvatarURL)
    .setDescription(`» Account Created On: **${client.moment(user.createdAt).format('dddd, MMMM Do, YYYY, hh:mm:ss A')}** (\`${client.moment(user.createdAt).fromNow()}\`)`)
    .addField('Username', user.tag, true)
    .addField('User ID', user.id, true)
    .addField('Bot', user.bot ? client.emotes.check : client.emotes.x, true)
    .addField('Status', status, true)
    .setThumbnail(user.displayAvatarURL)
    .setFooter(`Requested By ${message.author.username}`, message.author.displayAvatarURL);
  return message.channel.send(embed);
};

module.exports.conf = {
  enabled: true,
  reason: null,
  permission: 'SEND_MESSAGES',
  guildOnly: false,
  devOnly: false,
  cooldown: 5
};

module.exports.help = {
  name: 'find',
  category: 'utility',
  description: 'Finds a Discord user via their ID and returns their account information.',
  usage: '[prefix]find <user ID>',
  parameters: 'snowflakeDiscordUser',
  extended: false
};
