const { RichEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
  const { prefix, modLog } = client.settings.get(message.guild.id);
  const cases = client.cases.get(message.guild.id);
  if (!message.member.permissions.has('KICK_MEMBERS')) return client.permsError.member(client, message, 'KICK_MEMBERS');
  if (!message.guild.me.permissions.has('KICK_MEMBERS')) return client.permsError.self(client, message, 'KICK_MEMBERS');
  if (!args[0]) return client.usage(message, prefix, 'kick');
  const member = message.mentions.members.first() || message.guild.members.get(args[0]);
  if (!member) return client.argsError(client, message, 'Please provide a user mention or ID.');
  if (member.user.id === message.author.id) return message.delete(), message.reply('you cannot kick yourself.');
  if (member.user.id === message.guild.owner.user.id) {
    return message.delete(), message.channel.send('That user is the guild owner and cannot be moderated.');
  };
  if (client.roleHierarchy.bot(message, member) === true) {
    return message.delete(), message.channel.send('That user has a higher or equal role than the bot and cannot be moderated.');
  };
  const reason = args.slice(1).join(' ');
  if (reason.length < 1) return client.argsError(client, message, 'Please provide a reason for the kick.');
  await message.delete();
  try {
    const embed = new RichEmbed()
      .setAuthor(message.guild.name, message.guild.iconURL)
      .setDescription(`You have been kicked from ${message.guild.name} by __${message.author.tag}__`)
      .addField('Reason', reason)
      .setFooter('[!] You can join back with a valid invite link.')
      .setColor('ORANGE');
    await member.send(embed);
  } catch (e) {
    console.log(e.message);
  };
  const embed = new RichEmbed()
    .setColor('ORANGE')
    .setThumbnail('https://ptb.discordapp.com/channels/454417804507086874/454425680202039296/457007351401152522')
    .setAuthor(message.author.username, message.author.displayAvatarURL)
    .setTitle('User Kicked')
    .setDescription(`**${member.user.username}** has been kicked by **${message.author.username}**`)
    .addField('Reason', reason);
  await message.channel.send(member.user, embed);
  try {
    await member.kick(`Kicked by ${message.author.tag} | Reason: ${reason}`);
  } catch (e) {
    return message.channel.send(`${client.emotes.x} Error Kicking: \`${e.message}\``);
  };
  const log = message.guild.channels.find(c => c.name === modLog) || message.guild.channels.get(modLog);
  if (!log) return;
  cases.cases++;
  client.cases.set(message.guild.id, cases);
  const kickLog = new RichEmbed()
    .setColor('ORANGE')
    .setAuthor(`${member.user.username} | Kick`, member.user.displayAvatarURL)
    .setDescription(`**${member.user.tag} (${member.user.id})** was kicked by ${message.author.tag}`)
    .addField('Reason', reason)
    .setFooter(`Case #${cases.cases} | ${client.moment().format('dddd, MMMM Do, YYYY, hh:mm:ss A')}`);
  return log.send(kickLog);
};

module.exports.conf = {
  enabled: true,
  reason: null,
  permission: 'KICK_MEMBERS',
  devOnly: false
};

module.exports.help = {
  name: "kick",
  category: "moderation",
  description: "Kicks the mentioned user.",
  usage: "[prefix]kick <@user|user ID> <reason>",
  parameters: "snowflakeGuildMember, stringReason",
  extended: false
};
