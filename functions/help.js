const { RichEmbed } = require('discord.js');

module.exports = async (client, message, args) => {
  const { prefix } = client.settings.get(message.guild.id);
  const permCheck = (perm) => {
    return message.member.permissions.has(perm);
  };
  const mainHelp = new RichEmbed()
    .setColor(client.color)
    .setAuthor(client.user.username, client.user.displayAvatarURL)
    .setTitle('Help Menu')
    .setDescription(`To view help on a category, you can run \`${prefix}help --<category>\`\n\n> The available categories are: \`fun, bot, utility, admin, moderation\`.\n\nAlternatively, you can type \`${prefix}help <command>\` for help on a specific command.`)
  const fun_commands = new RichEmbed()
    .setColor(client.color)
    .setAuthor(client.user.username, client.user.displayAvatarURL)
    .setTitle('Help Menu - Fun Commands')
    .setDescription(`\`\`\`${client.commands.fun.join('\n')}\`\`\``);
  const mod_commands = new RichEmbed()
    .setColor(client.color)
    .setAuthor(client.user.username, client.user.displayAvatarURL)
    .setTitle('Help Menu - Moderation Commands')
    .setDescription(`\`\`\`${client.commands.moderation.join('\n')}\`\`\``);
  const admin_commands = new RichEmbed()
    .setColor(client.color)
    .setAuthor(client.user.username, client.user.displayAvatarURL)
    .setTitle('Help Menu - Administrator Commands')
    .setDescription(`\`\`\`${client.commands.admin.join('\n')}\`\`\``);
    const bot_commands = new RichEmbed()
      .setColor(client.color)
      .setAuthor(client.user.username, client.user.displayAvatarURL)
      .setTitle('Help Menu - Bot / Info Commands')
      .setDescription(`\`\`\`${client.commands.bot.join('\n')}\`\`\``);
      const utility_commands = new RichEmbed()
        .setColor(client.color)
        .setAuthor(client.user.username, client.user.displayAvatarURL)
        .setTitle('Help Menu - Utility Commands')
        .setDescription(`\`\`\`${client.commands.utility.join('\n')}\`\`\``);
  if (!args[0]) return message.channel.send(mainHelp);
  if (args[0].toLowerCase() === '--fun') return message.channel.send(fun_commands);
  if (args[0].toLowerCase() === '--moderation') {
    if (permCheck('KICK_MEMBERS') === false && permCheck('BAN_MEMBERS') === false) {
      return message.channel.send(`${client.emotes.x} It seems you are not a moderator and cannot view these commands.`);
    } else {
      return message.channel.send(mod_commands);
    };
  };
  if (args[0].toLowerCase() === '--admin') {
    if (permCheck('ADMINISTRATOR') === false) {
      return message.channel.send(`${client.emotes.x} It seems you are not an administrator and cannot view these commands.`);
    } else {
      return message.channel.send(admin_commands);
    };
  }
  if (args[0].toLowerCase() === '--bot') return message.channel.send(bot_commands);
  if (args[0].toLowerCase() === '--utility') return message.channel.send(utility_commands);
};
