let errors = require('../functions/errors/misc.js');
const cmdError = errors.cmdError;
const blacklist = errors.blacklist;
const guildDisabled = errors.guildDisbled;
const globalDisabled = errors.globalyDisabled;

module.exports = async (client, message) => {
  const {
    prefix,
    disabled_commands,
    ignored
  } = client.settings.get(message.guild.id);
  const run = async (cmd, path) => {
    try {
      let file = require(`${path}/${cmd}.js`);
      if (!file) return;
      if (client.blacklist.includes(message.author.id)) return blacklist(client, message);
      if (file.conf.enabled === false) return globalDisabled(client, message, cmd, file.conf.reason);
      if (disabled_commands.includes(cmd)) return guildDisbled(client, message, cmd);
      await file.run(client, message, args);
    } catch (e) {
      await console.log(client.chalk.redBright.inverse(`[!] Command Error [!]\nCommand: ${cmd}\n\n${e.stack}`));
      return cmdError(client, message, e.message);
    };
  };
  if (message.channel.type !== 'text') return;
  if (message.author.bot) return;
  //if (message.isMentioned(client.user)) return message.reply(`the prefix for ${message.guild.name} is set to \`${prefix}\``);
  if (message.content.toLowerCase() === `<@${client.user.id}> prefix`) return message.reply(`the prefix for ${message.guild.name} is set to \`${prefix}\``);
  // let str = message.content;
  // let regex = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-z]/ig;
  // if (regex.test(str) === true) return message.reply('bad!');
  if (!message.content.startsWith(prefix)) return;
  let args = message.content.split(' ').slice(1);
  let command = message.content.split(' ')[0];
  command = command.slice(prefix.length);
  if (ignored.channels.includes(message.channel.id)) return;
  if (ignored.users.includes(message.author.id)) return;
  //if (ignore.roles.includes(message.member.))
  if (client.commands.bot.includes(command)) {
    run(command, '../commands/bot');
  } else if (client.commands.moderation.includes(command)) {
    run(command, '../commands/moderation');
  } else if (client.commands.admin.includes(command)) {
    run(command, '../commands/admin');
  } else if (client.commands.utility.includes(command)) {
    run(command, '../commands/utility');
  } else if (client.commands.fun.includes(command)) {
    run(command, '../commands/fun');
  } else if (client.commands.developer.includes(command)) {
    run(command, '../commands/developer');
  } else if (client.commands.misc.includes(command)) {
    run(command, '../commands/misc');
  } else {
    return;
  };
};
