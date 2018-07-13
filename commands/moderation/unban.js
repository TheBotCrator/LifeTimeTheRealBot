const { RichEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
  const { prefix, modLog } = client.settings.get(message.guild.id);
  const cases = client.cases.get(message.guild.id);
  if (!message.member.permissions.has('BAN_MEMBERS')) return client.permsError.member(client, message, 'BAN_MEMBERS');
  if (!message.guild.me.permissions.has('BAN_MEMBERS')) return client.permsError.self(client, message, 'BAN_MEMBERS');
  if (!args[0]) return client.usage(message, prefix, 'unban');
  if (isNaN(parseInt(args[0]))) return client.argsError(client, message, 'Invalid ID provided.');
  if (args[0].length !== 18) return client.argsError(client, message, 'User IDs can only be 18 characters in length.');
  let reason = args.slice(1).join(' ');
  if (reason.length < 1) reason = 'No reason given.';
  const user = await client.fetchUser(args[0])//.catch((e) => { client.argsError(client, message, 'The ID provided does not belong to a Discord user.')});
  const bans = await message.guild.fetchBans();
  message.delete();
  if (!bans.has(args[0])) return client.argsError(client, message, 'That user is not banned.');
  try {
    await message.guild.unban(args[0], `Unbanned by ${message.author.tag} | Reason: ${reason}`);
  } catch (e) {
    return message.channel.send(`${client.emotes.x} Error Unbanning: \`${e.message}\``);
  };
  const embed = new RichEmbed()
  .setColor('GREEN')
  .setAuthor(message.author.username, message.author.displayAvatarURL)
  .setTitle('User Unbanned')
  .setDescription(`**${user.username}** has been unbanned by **${message.author.username}**`)
  .addField('Reason', reason);
  message.channel.send(embed);
  const log = message.guild.channels.find(c => c.name === modLog) || message.guild.channels.get(modLog);
  if (!log) return;
  cases.cases++;
  client.cases.set(message.guild.id, cases);
  const banLog = new RichEmbed()
    .setColor('GREEN')
    .setAuthor(`${user.username} | Unban`, user.displayAvatarURL)
    .setDescription(`**${user.tag} (${user.id})** was unbanned by ${message.author.tag}`)
    .addField('Reason', reason)
    .setFooter(`Case #${cases.cases} | ${client.moment().format('dddd, MMMM Do, YYYY, hh:mm:ss A')}`);
  return log.send(banLog);
};

module.exports.conf = {
  enabled: true,
  reason: null,
  permission: 'BAN_MEMBERS',
  devOnly: false
};

module.exports.help = {
  name: "unban",
  category: "moderation",
  description: "Unbans a banned user.",
  usage: "[prefix]unban <user ID> <reason(optional)>",
  parameters: "snowflakeDiscordUser, stringReason",
  extended: false
};
