const { RichEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
  const { prefix, modLog } = client.settings.get(message.guild.id);
  const cases = client.cases.get(message.guild.id);
  if (!message.member.permissions.has('BAN_MEMBERS')) return client.permsError.member(client, message, 'BAN_MEMBERS');
  if (!message.guild.me.permissions.has('BAN_MEMBERS')) return client.permsError.self(client, message, 'BAN_MEMBERS');
  if (!args[0]) return client.usage(message, prefix, 'softban');
  const member = message.mentions.members.first() || message.guild.members.get(args[0]);
  if (!member) return client.argsError(client, message, 'Please provide a user mention or ID.');
  if (member.user.id === message.author.id) return message.delete(), message.reply('you cannot ban yourself.');
  if (member.user.id === message.guild.owner.user.id) {
    return message.delete(), message.channel.send('That user is the guild owner and cannot be moderated.');
  };
  if (client.roleHierarchy.bot(message, member) === true) {
    return message.delete(), message.channel.send('That user has a higher or equal role than the bot and cannot be moderated.');
  };
  const reason = args.slice(1).join(' ');
  if (reason.length < 1) return client.argsError(client, message, 'Please provide a reason for the ban.');
  await message.delete();
  try {
    const embed = new RichEmbed()
      .setAuthor(message.guild.name, message.guild.iconURL)
      .setDescription(`You have been soft-banned from ${message.guild.name} by __${message.author.tag}__`)
      .addField('Reason', reason)
      .setColor('RED')
      .setFooter('[!] You can join back with a valid invite link.');
    await member.send(embed);
  } catch (e) {
    console.log(e.message);
  };
  const embed = new RichEmbed()
    .setColor('RED')
    .setThumbnail('https://vignette.wikia.nocookie.net/the-zula-patrol/images/6/62/Red_X_icon.png/revision/latest?cb=20150702044511')
    .setAuthor(message.author.username, message.author.displayAvatarURL)
    .setTitle('User Banned')
    .setDescription(`**${member.user.username}** has been soft-banned by **${message.author.username}**`)
    .addField('Reason', reason);
  await message.channel.send(member.user, embed);
  try {
    await member.ban({
      days: 1,
      reason: `Banned by ${message.author.tag} | Reason: ${reason}`
    });
  } catch (e) {
    return message.channel.send(`${client.emotes.x} Error Banning: \`${e.message}\``);
  };
  const user = await client.fetchUser(member.user.id);
  setTimeout(() => {
    message.guild.unban(user.id);
  }, (5000));
  const log = message.guild.channels.find(c => c.name === modLog) || message.guild.channels.get(modLog);
  if (!log) return;
  cases.cases + 2;
  client.cases.set(message.guild.id, cases);
  const banLog = new RichEmbed()
    .setColor('RED')
    .setAuthor(`${member.user.username} | Ban`, member.user.displayAvatarURL)
    .setDescription(`**${member.user.tag} (${member.user.id})** was banned by ${message.author.tag}`)
    .addField('Reason', reason)
    .setFooter(`Case #${cases.cases - 1} | ${client.moment().format('dddd, MMMM Do, YYYY, hh:mm:ss A')}`);
  const unbanLog = new RichEmbed()
    .setColor('GREEN')
    .setAuthor(`${user.username} | Unban`, user.displayAvatarURL)
    .setDescription(`**${user.tag} (${user.id})** was banned by ${client.user.tag}`)
    .addField('Reason', 'Ban expired')
    .setFooter(`Case #${cases.cases} | ${client.moment().format('dddd, MMMM Do, YYYY, hh:mm:ss A')}`);
  log.send(banLog);
  setTimeout(() => {
    log.send(unbanLog);
  }, (5000));
  return;
};

module.exports.conf = {
  enabled: true,
  reason: null,
  permission: 'BAN_MEMBERS',
  devOnly: false
};

module.exports.help = {
  name: "softban",
  category: "moderation",
  description: "Bans the mentioned user and deletes their messages sent in the previous 24 hours before unbanning the user. Useful for spammers.",
  usage: "[prefix]softban <@user|user ID> <reason>",
  parameters: "snowflakeGuildMember, stringReason",
  extended: false
};
