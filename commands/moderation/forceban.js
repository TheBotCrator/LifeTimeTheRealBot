const { RichEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
  const { prefix, modLog } = client.settings.get(message.guild.id);
  const cases = client.cases.get(message.guild.id);
  if (!message.member.permissions.has('BAN_MEMBERS')) return client.permsError.member(client, message, 'BAN_MEMBERS');
  if (!message.guild.me.permissions.has('BAN_MEMBERS')) return client.permsError.self(client, message, 'BAN_MEMBERS');
  if (!args[0]) return client.usage(message, prefix, 'forceban');
  if (isNaN(parseInt(args[0]))) return client.argsError(client, message, 'Invalid ID provided.');
  if (args[0].length !== 18) return client.argsError(client, message, 'User IDs can only be 18 characters in length.');
  let reason = args.slice(1).join(' ');
  if (reason.length < 1) reason = 'No reason given.';
  if (args[0] === message.author.id) return client.argsError(client, message, 'Nice try! But you can\'t ban yourself.');
  if (args[0] === message.guild.owner.user.id) return client.argsError(client, message, 'Nice try! But you can\'t ban the owner of the guild.');
  if (args[0] === client.user.id) return client.argsError(client, message, 'I thought we were friends, why are you trying to ban me!');
  const user = await client.fetchUser(args[0]).catch((e) => { client.argsError(client, message, 'The ID provided does not belong to a Discord user.')});
  const bans = await message.guild.fetchBans();
  message.delete();
  if (bans.has(args[0])) return client.argsError(client, message, 'That user is already banned.');
  try {
    await message.guild.ban(args[0], `Force-Banned by ${message.author.tag} | Reason: ${reason}`);
  } catch (e) {
    return message.channel.send(`${client.emotes.x} Error Banning: \`${e.message}\``);
  };
  const embed = new RichEmbed()
  .setColor('RED')
  .setThumbnail('https://vignette.wikia.nocookie.net/the-zula-patrol/images/6/62/Red_X_icon.png/revision/latest?cb=20150702044511')
  .setAuthor(message.author.username, message.author.displayAvatarURL)
  .setTitle('User Banned')
  .setDescription(`**${user.username}** has been force-banned by **${message.author.username}**`)
  .addField('Reason', reason);
  message.channel.send(embed);
  const log = message.guild.channels.find(c => c.name === modLog) || message.guild.channels.get(modLog);
  if (!log) return;
  cases.cases++;
  client.cases.set(message.guild.id, cases);
  const banLog = new RichEmbed()
    .setColor('RED')
    .setAuthor(`${user.username} | Ban`, user.displayAvatarURL)
    .setDescription(`**${user.tag} (${user.id})** was force-banned by ${message.author.tag}`)
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
    name: "forceban",
    category: "MODERATION",
    description: "Force-bans any Discord user, whether they're in the server or not.",
    usage: "[prefix]forceban <ID> <reason(optional)>",
    parameters: "snowflakeDiscordUser, stringReason",
    extended: false
};
