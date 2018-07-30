const Command = require('../base/command.js')
const { RichEmbed } = require('discord.js');

class Help extends Command {
  constructor(client) {
    super(client, {
      name: 'help',
      category: 'bot',
      description: 'Get a list of available commands on the bot, or help on a specific command.',
      usage: '{prefix}help [commandName]',
      parameters: 'stringCommandName',
      extended: false,
      extended_help: null,
      aliases: ['h'],
      enabled: true,
      reason: null,
      guildOnly: false,
      devOnly: false,
      cooldown: 5
    });
  };

  async run(message, args) {
    const { prefix } = this.client.settings.get(message.guild.id);
    const permCheck = (message, perm) => {
      if (message.member.permissions.has(perm)) {
        return true;
      } else {
        const embed = new RichEmbed()
          .setColor('RED')
          .setDescription(`${this.client.emotes.x} You can't view this command or list of commands because you lack the permission \`${perm}\``);
        return message.channel.send(embed);
      };
    };
    const main_help = new RichEmbed()
      .setFooter(`» Total Commands: ${this.client.total(this.client)}`)
      .setColor(this.client.color)
      .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
      .setTitle('Help Menu')
      .setDescription(`To view help on a category, run \`${prefix}help --<category>\`\n» Available Categories: \`admin, bot, fun, moderation, utility\`\n» Need help on a specific command? Simply run \`${prefix}help <command>\``);
      const admin_commands = new RichEmbed()
      .setColor(this.client.color)
      .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
      .setTitle('Help Menu - Admin Commands')
      .setDescription(`\`${this.client.commands.admin.sort().join(', ')}\``)
      .setFooter(`» Total Commands: ${this.client.commands.admin.length}`);
    const bot_commands = new RichEmbed()
      .setColor(this.client.color)
      .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
      .setTitle('Help Menu - Bot Commands')
      .setDescription(`\`${this.client.commands.bot.sort().join(', ')}\``)
      .setFooter(`» Total Commands: ${this.client.commands.bot.length}`);
    const fun_commands = new RichEmbed()
      .setColor(this.client.color)
      .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
      .setTitle('Help Menu - Fun Commands')
      .setDescription(`\`${this.client.commands.fun.sort().join(', ')}\``)
      .setFooter(`» Total Commands: ${this.client.commands.fun.length}`);
    const mod_commands = new RichEmbed()
      .setColor(this.client.color)
      .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
      .setTitle('Help Menu - Moderation Commands')
      .setDescription(`\`${this.client.commands.moderation.sort().join(', ')}\``)
      .setFooter(`» Total Commands: ${this.client.commands.moderation.length}`);
    const utility_commands = new RichEmbed()
      .setColor(this.client.color)
      .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
      .setTitle('Help Menu - Utility Commands')
      .setDescription(`\`${this.client.commands.utility.sort().join(', ')}\``)
      .setFooter(`» Total Commands: ${this.client.commands.utility.length}`);
    if (!args[0]) return message.channel.send(main_help);
    if (!message.content.includes('--')) {
      let command = args[0].toLowerCase();
      command = this.client.cmds.get(command);
      if (!command) return;
      const name = command.help.name;
      const desc = command.help.description;
      const usage = command.help.usage.replace('{prefix}', prefix);
      const params = command.help.parameters;
      const aliases = command.conf.aliases.join(', ');
      if (!message.member.permissions.has(command.conf.permission)) {
        const embed = new RichEmbed()
          .setColor('RED')
          .setDescription(`${this.client.emotes.x} You can't view this command or list of commands because you lack the permission \`${command.conf.permission}\``);
        return message.channel.send(embed);
      };
      if (!command.help.extended) {
        const embed = new RichEmbed()
          .setColor(this.client.color)
          .setAuthor(`Command: ${name}`, this.client.user.displayAvatarURL)
          .setDescription(`\`< >\` Denotes a __required__ parameter.\n\`[ ]\` Denotes an optional parameter.`)
          .addField('Description', desc)
          .addField('Usage', usage)
          .addField('Parameters', params)
          .addField('Aliases', `\`[${aliases}]\``);
        return message.channel.send(embed);
      } else {
        const embed = new RichEmbed()
          .setColor(this.client.color)
          .setAuthor(`Command: ${name}`, this.client.user.displayAvatarURL)
          .setDescription(`\`< >\` Denotes a __required__ parameter.\n\`[ ]\` Denotes an optional parameter.`)
          .addField('Description', desc)
          .addField('Usage', usage)
          .addField('Parameters', params)
          .addField('Aliases', `\`[${aliases}]\``)
          .addField('Extended Help', command.help.extended_help.replace('{prefix}', prefix));
        return message.channel.send(embed);
      };
    };
    switch (args[0].split('--')[1].toLowerCase()) {
      case 'admin':{
        if (permCheck(message, 'ADMINISTRATOR') === true) {
          return message.channel.send(admin_commands);
        };
      };
      break;
      case 'bot':{
        return message.channel.send(bot_commands);
      };
      break;
      case 'fun':{
        return message.channel.send(fun_commands);
      };
      break;
      case 'mod':
      case 'moderation':{
        if (permCheck(message, 'KICK_MEMBERS') === true) {
          return message.channel.send(mod_commands);;
        };
      };
      break;
      case 'music':{
        return;
      };
      break;
      case 'utility':{
        return message.channel.send(utility_commands);
      };
      break;
      default: {};
    };
  };
};

module.exports = Help;
