const { RichEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
  let member;
  if (!args[0]) {
    member = message.member;
  } else {
    member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;
  };
  const gjoinedOn = client.moment(member.joinedAt).format('dddd, MMMM Do, YYYY, hh:mm:ss A');
  const djoinedOn = client.moment(member.user.createdAt).format('dddd, MMMM Do, YYYY, hh:mm:ss A');
  let status;
  if (member.user.presence.status === 'online') {
    status = `<:utilidexOnline:466475765207138315>ONLINE`;
  } else if (member.user.presence.status === 'idle') {
    status = `<:utilidexIdle:466475764087521292>IDLE`;
  } else if (member.user.presence.status === 'dnd') {
    status = `<:utilidexDND:466475824359407626>DND`;
  } else if (member.user.presence.status === 'streaming') {
    status = `<:utilidexStreaming:466476812071862283>STREAMING`;
  } else if (member.user.presence.status === 'offline') {
    status = `<:utilidexOffline:466475764418871298>OFFLINE`;
  };
  let note;
  let roleSize = member.roles.size > 1 ? member.roles.size - 1 : 0;
  let roles = member.roles.size > 1 ? member.roles.map(r => r.name).slice(1).join(', ') : 'No roles';
  let highestRole = member.roles.size > 1 ? member.highestRole.name : 'No Highest Role';
  const embed = new RichEmbed()
    .setColor(client.color)
    .setAuthor(member.user.username, member.user.displayAvatarURL)
    .setDescription(`» Status: **${status}**\n» Nickname: **${member.displayName}**`)
    .addField('Username', member.user.tag, true)
    .addField('User ID', member.user.id, true)
    .addField('Joined Discord On', djoinedOn, true)
    .addField('Joined On', gjoinedOn, true)
    .addField(`Roles [${roleSize}]`, `${roles}\n\nHighest Role: __**${highestRole}**__`)
    .setFooter(`Requested by: ${message.author.username}`, message.author.displayAvatarURL)
    .setThumbnail(member.user.displayAvatarURL);
  return message.channel.send(embed);
};

module.exports.conf = {
  enabled: true,
  reason: null,
  permission: 'SEND_MESSAGES',
  devOnly: false
};

module.exports.help = {
  name: 'user',
  category: 'utility',
  description: 'Retrieves information for a user.',
  usage: '[prefix]user <@user|user ID>',
  parameters: 'snowflakeGuildMember',
  extended: 'If no member is mentioned or is invalid, it will display information for the author.'
};
