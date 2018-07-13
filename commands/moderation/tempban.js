const { RichEmbed } = require('discord.js');
const ms = require('ms');

module.exports.run = async (client, message, args) => {
  const { prefix, modLog, muteRole } = client.settings.get(message.guild.id);
  let cases = client.cases.get(message.guild.id);
  if (!message.member.permissions.has('BAN_MEMBERS')) return client.permsError.member(client, message, 'BAN_MEMBERS');
  if (!message.guild.me.permissions.has('BAN_MEMBERS')) return client.permsError.self(client, message, 'BAN_MEMBERS');
  if (!args[0]) return client.usage(message, prefix, 'tempban');
  const member = message.mentions.members.first() || message.guild.members.get(args[0]);
  if (!member) return client.argsError(client, message, 'Please provide a user mention or ID.');
  if (member.user.id === message.author.id) return message.delete(), message.reply('you cannot ban yourself.');
  if (member.user.id === message.guild.owner.user.id) {
    return message.delete(), message.channel.send('That user is the guild owner and cannot be moderated.');
  };
  if (client.roleHierarchy.bot(message, member) === true) {
    return message.delete(), message.channel.send('That user has a higher or equal role than the bot and cannot be moderated.');
  };
  const time = args[1];
  if (!time) return client.argsError(client, message, 'Please provide a duration for the ban to last.');
  if (isNaN(parseInt(time))) return client.argsError(client, message, 'Invalid duration provided.');
  //add time restrictions here.
  const reason = args.slice(2).join(' ');
  if (reason.length < 1) return client.argsError(client, message, 'Please provide a reason for the ban.');
  await message.delete();
  try {
    const embed = new RichEmbed()
      .setColor('RED')
      .setAuthor(message.guild.name, message.guild.iconURL)
      .setDescription(`You have been banned from ${message.guild.name} for \`${ms(ms(time), {long: true})}\` by **${message.author.tag}**`)
      .addField('Reason', reason)
      .setFooter('[!] You can join back with a valid invite link once the ban expires.');
    await member.send(embed);
  } catch (e) {
    console.log(e.message);
  };
  const embed = new RichEmbed()
    .setColor('RED')
    .setThumbnail('https://vignette.wikia.nocookie.net/the-zula-patrol/images/6/62/Red_X_icon.png/revision/latest?cb=20150702044511')
    .setAuthor(message.author.username, message.author.displayAvatarURL)
    .setTitle('User Banned')
    .setDescription(`**${member.user.username}** has been temp-banned for ${ms(ms(time), {long: true})} by **${message.author.username}**`)
    .addField('Reason', reason);
  await message.channel.send(member.user, embed);
  try {
    await member.ban(`Banned by ${message.author.tag} | Reason: ${reason}`);
  } catch (e) {
    return message.channel.send(`${client.emotes.x} Error Banning: \`${e.message}\``);
  };
  const user = await client.fetchUser(member.user.id);
  setTimeout(() => {
    message.guild.unban(user.id);
  }, ms(time));
  const log = message.guild.channels.find(c => c.name === modLog) || message.guild.channels.get(modLog);
  if (!log) return;

  client.cases.set(message.guild.id, cases);
  const banLog = new RichEmbed()
    .setColor('RED')
    .setAuthor(`${member.user.username} | Ban`, member.user.displayAvatarURL)
    .setDescription(`**${member.user.tag} (${member.user.id})** was temp-banned for \`${ms(ms(time), {long: true})}\` by ${message.author.tag}`)
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
  }, ms(time));
  return;
};

module.exports.conf = {
  enabled: true,
  reason: null,
  permission: 'BAN_MEMBERS',
  devOnly: false
};

module.exports.help = {
  name: "tempban",
  category: "moderation",
  description: "Temporarily bans the mentioned user.",
  usage: "[prefix]tempban <@user|user ID> <time> <reason>",
  parameters: "snowflakeGuildMember, integerTime, stringReason",
  extended: false
};
