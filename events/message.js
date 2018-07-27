let errors = require('../functions/errors/misc.js');
const cmdError = errors.cmdError;
const blacklist = errors.blacklist;
const guildDisabled = errors.guildDisbled;
const globalDisabled = errors.globalyDisabled;

class Message {
  constructor(client) {
    this.client = client;
  };

  async run(message) {
    const { prefix, disabled_commands, ignored } = this.client.settings.get(message.guild.id);
    const cmdRun = async (command, path) => {
      try {
        const cmd = this.client.cmds.get(command) || this.client.cmds.get(this.client.aliases.get(command));
        // const file = require(`${path}${command}`)
        // if (!file) return;
        // if (!file.help || !file.conf) throw new Error('module.exports.help or module.exports.conf is missing in the file.');
        //if (file.conf.enabled === false) return globalDisabled(this.client, message, cmd, file.conf.reason);
        //if (this.client.blacklist.includes(message.author.id)) return blacklist(this.client, message);
        //if (file.conf.enabled === false) return globalDisabled(this.client, message, cmd, file.conf.reason);
        //if (disabled_commands.includes(command)) return guildDisbled(this.client, message, cmd);
        await cmd.run(message, args);
        this.client.emit('commandSuccess', message);
      } catch (e) {
        await console.log(this.client.chalk.bgRed(`Command Error\nCommand: ${command}\nUser: ${message.author.tag}\nGuild: ${message.guild.name}\nError:\n${e.stack}`));
        return cmdError(this.client, message, e.message);
      };
    };
    if (message.channel.type !== 'text') return;
    message.channel.guild.settings = this.client.settings.get(message.guild.id);
    if (message.author.bot) return;
    if (message.content.toLowerCase() === `<@${this.client.user.id}> prefix`) return message.reply(`the prefix for ${message.guild.name} is set to \`${prefix}\``);
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.split(' ').slice(1);
    let command = message.content.split(' ')[0];
    command = command.slice(prefix.length).toLowerCase();
    if (ignored.channels.includes(message.channel.id)) return;
    if (ignored.users.includes(message.author.id)) return;
    //if (ignore.roles.includes(message.member.))
    if (this.client.commands.bot.includes(command)) {
      cmdRun(command, '../commands/bot/');
    } else if (this.client.commands.moderation.includes(command)) {
      cmdRun(command, '../commands/moderation/');
    } else if (this.client.commands.admin.includes(command)) {
      cmdRun(command, '../commands/admin/');
    } else if (this.client.commands.utility.includes(command)) {
      cmdRun(command, '../commands/utility/');
    } else if (this.client.commands.fun.includes(command)) {
      cmdRun(command, '../commands/fun/');
    } else if (this.client.commands.developer.includes(command)) {
      cmdRun(command, '../commands/developer/');
    } else if (this.client.commands.music.includes(command)) {
      cmdRun(command, '../commands/music/');
    } else {
      return;
    };
  };
};

module.exports = Message;
