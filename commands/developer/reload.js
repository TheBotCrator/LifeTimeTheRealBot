const { RichEmbed } = require("discord.js");

module.exports.run = (client, message, args) => {
  const { prefix } = client.settings.get(message.guild.id);
  const reload = async (path, command) => {
    const msg = await message.channel.send(`Reloading the command \`${cmd}\`...`);
    try {
      await delete require.cache[require.resolve(`${path}${command}.js`)];
      return msg.edit(`${client.emotes.check} Successfully reloaded the command \`${cmd}\``);
    } catch (e) {
      return msg.edit(`${client.emotes.x} \`ERROR\` - \`${e.message}\``);
    };
  };
  const notDev = new RichEmbed()
    .setColor('RED')
    .setTitle(`${client.emotes.x} This command can only be ran by the bot developer.`);
    if (message.author.id !== '312358298667974656') return message.delete(), message.channel.send(notDev)
    if (!args[0]) return client.usage(message, prefix, 'reload');
    const cmd = args[0].toLowerCase();
    let path;
    if (client.commands.admin.includes(cmd)) {
      path = '../admin/';
    } else if (client.commands.bot.includes(cmd)) {
      path = './bot/';
    } else if (client.commands.developer.includes(cmd)) {
      path = './';
    } else if (client.commands.fun.includes(cmd)) {
      path = '../fun/';
    } else if (client.commands.moderation.includes(cmd)) {
      path = '../moderation/';
    } else if (client.commands.utility.includes(cmd)) {
      path = '../utility/';
    } else {
      return message.channel.send(`${client.emotes.x} ${message.author} The command \`${cmd}\` is not recognized by the bot.`);
    };
    return reload(path, cmd);
};
module.exports.conf = {
    enabled: true,
    reason: null,
    permission: 'SEND_MESSAGES',
    devOnly: true
};

module.exports.help = {
    name: "reload",
    category: "client DEVELOPER",
    description: "Reloads a command.",
    usage: "[prefix]reload <command>",
    parameters: "stringCommand"
};
