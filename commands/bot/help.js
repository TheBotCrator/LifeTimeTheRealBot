const { RichEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
  const { prefix } = client.settings.get(message.guild.id);
  if (!args[0]) return client.runHelp(client, message, args);
  const command = args[0].toLowerCase();
  if (!client.commands.moderation.includes(command) && !client.commands.admin.includes(command) &&
    !client.commands.bot.includes(command) && !client.commands.fun.includes(command) &&
    !client.commands.utility.includes(command)) {
      try {
        client.runHelp(client, message, args);
      } catch (e) {
        return;
      };
    };
  const commandHelp = (cmd, path) => {
    let file = require(`${path}${cmd}`);
    if (!file) return;
    let name = file.help.name;
    let desc = file.help.description;
    let cat = file.help.category.toUpperCase();
    let usage = file.help.usage;
    usage = usage.replace('[prefix]', prefix);
    let params = file.help.parameters;
    if (file.help.extended === false) {
      const embed = new RichEmbed()
        .setColor(client.color)
        .setAuthor(client.user.username, client.user.displayAvatarURL)
        .setDescription(`**» Command: ${name}**`)
        .addField('Description', desc)
        .addField('Usage', usage)
        .addField('Parameters', params)
        .setFooter(`Command Category: ${cat}`);
      return message.channel.send(embed);
    } else {
      const embed = new RichEmbed()
        .setColor(client.color)
        .setAuthor(client.user.username, client.user.displayAvatarURL)
        .setDescription(`**» Command: ${name}**`)
        .addField('Description', desc)
        .addField('Usage', usage)
        .addField('Parameters', params)
        .addField('Extended', file.help.extended)
        .setFooter(`Command Category: ${cat}`);
      return message.channel.send(embed);
    };
  };
  let path;
  if (client.commands.bot.includes(command)) {
    path = './';
  } else if (client.commands.moderation.includes(command)) {
    path = '../moderation/';
  } else if (client.commands.admin.includes(command)) {
    path = '../admin/';
  } else if (client.commands.fun.includes(command)) {
    path = '../fun/';
  } else if (client.commands.utility.includes(command)) {
    path = '../utility/';
  } else if (client.commands.misc.includes(command)) {
    path = '../misc/';
  } else {
    return;
  };
  return commandHelp(command, path);
};

module.exports.conf = {
  enabled: true,
  reason: null,
  permission: 'SEND_MESSAGES',
  devOnly: false
};

module.exports.help = {
  name: "help",
  category: "bot",
  description: "View the bot's commands, or get help on a specific command.",
  usage: "[prefix]help <command>",
  parameters: "stringCommand",
  extended: false
};
