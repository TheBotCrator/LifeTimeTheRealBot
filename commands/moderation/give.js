const { RichEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
  const { prefix, roleLog } = client.settings.get(message.guild.id);
  if (!message.member.permissions.has('MANAGE_ROLES')) return client.permsError.member(client, message, 'MANAGE_ROLES');
  if (!message.guild.me.permissions.has('MANAGE_ROLES')) return client.permsError.self(client, message, 'MANAGE_ROLES');
  if (!args[0]) return client.usage(message, prefix, 'give');
  const member = message.mentions.members.first() || message.guild.members.get(args[0]);
  if (!member) return client.argsError(client, message, 'Please provide a user mention or ID.');
  let role = args.slice(1).join(' ');
  if (!role) return client.argsError(client, message, 'Please provide a valid role mention, name, or ID.');
  if (client.roleExists(message, role) === false) return client.argsError(client, message, 'Please provide a valid role mention, name, or ID.');
  if (client.roleHierarchy.role(message, role) === true) return client.argsError(client, message, 'That role appears to be above the bot and cannot be assigned to users via the bot.');
  role = message.guild.roles.find(r => r.name.toLowerCase() === role) || message.guild.roles.find(r => r.name.toLowerCase().includes(role)) || message.guild.roles.get(role);
  message.delete();
  if (member.roles.has(role.id)) return message.channel.send(`${client.emotes.x} \`${member.user.tag}\` already has that role.`);
  try {
    await member.addRole(role, `Added by ${message.author.tag}`);
  } catch (e) {
    return message.channel.send(`${client.emotes.x} Error: \`${e.message}`);
  };
  const embed = new RichEmbed()
    .setColor('GREEN')
    .setTitle('Success!')
    .setAuthor(message.author.username, message.author.displayAvatarURL)
    .setDescription(`\`${message.author.username}\` gave \`${member.user.username}\` the role \`${role.name}\``);
  message.channel.send(embed);
  const log = message.guild.channels.find(c => c.name === roleLog) || message.guild.channels.get(roleLog);
  if (!log) return;
  const logEmbed = new RichEmbed()
    .setColor('GREEN')
    .setTitle('Role Given')
    .setAuthor(message.author.username, message.author.displayAvatarURL)
    .addField('User', member.user.tag, true)
    .addField('Moderator', message.author.tag, true)
    .addField('Role', role.name, true)
    .setFooter(client.moment().format('dddd, MMMM Do, YYYY, hh:mm A'));
  return log.send(logEmbed);
};

module.exports.conf = { enabled: true };
