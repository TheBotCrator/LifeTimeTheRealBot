const { RichEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
  if (!args[0]) return client.usage(message, client.settings.get(message.guild.id).prefix, 'role');
  const str = args.join(' ').toLowerCase();
  const role = message.mentions.roles.first() || message.guild.roles.find(r => r.name.toLowerCase() === str) || message.guild.roles.find(r => r.name.toLowerCase().includes(str)) || message.guild.roles.get(str);
  if (!role) return client.argsError(client, message, 'Please provide a valid role mention, name, or ID.');
  const inRole = role.members.size > 0 ? role.members.map(u => u.user.tag).join(', ') : 'No users to show.';
  const pos = role.calculatedPosition;
  const color = `${role.hexColor} (\`${role.color}\`)`;
  const created = `${client.moment(role.createdAt).format('dddd, MMMM Do, YYYY, hh:mm:ss A')} (${client.moment(role.createdAt).fromNow()})`;
  const embed = new RichEmbed()
    .setColor(role.hexColor)
    .setAuthor(message.guild.name, message.guild.iconURL)
    .setDescription(`» Role Information for Role: __**${role.name}**__`)
    .addField('Role Name', role.name, true)
    .addBlankField(true)
    .addField('Role ID', role.id, true)
    .addField('Hoisted', role.hoisted ? client.emotes.check : client.emotes.x, true)
    .addBlankField(true)
    .addField('Mentionable', role.mentionable ? client.emotes.check : client.emotes.x, true)
    .addField('Role Color', color)
    .addField(`Users in Role [${role.members.size}]`, `\`\`\`${inRole}\`\`\``)
    .addField('Created At', created)
    .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL)
  return message.delete(), message.channel.send(embed);
};

module.exports.conf = {
  enabled: true,
  reason: null,
  permission: 'SEND_MESSAGES',
  devOnly: false
};

module.exports.help = {
  name: 'role',
  category: 'utility',
  description: 'Displays information for a certain role in the current guild.',
  usage: '[prefix]role <@role|role name|role ID>',
  parameters: 'snowflakeGuildRole',
  extended: 'The role is __not__ case sensitive, nor does it have to be fully written out in most cases.'
};
