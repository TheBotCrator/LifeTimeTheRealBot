const { RichEmbed } = require('discord.js');

module.exports.blacklist = (client, message) => {
  const embed = new RichEmbed()
    .setColor('GOLD')
    .setDescription(`${client.emotes.warn} You have been blacklisted by the bot developer and cannot run any commands.`);
  message.channel.send(embed);
};

module.exports.cmdError = (client, message, error) => {
  const embed = new RichEmbed()
    .setColor('RED')
    .addField(`${client.emotes.x} Something Went Wrong`, `\`${error}\``);
  message.channel.send(embed);
};

module.exports.guildDisabled = (client, message, cmd) => {
  const embed = new RichEmbed()
    .setColor('RED')
    .setDescription(`${client.emotes.x} The command \`${cmd}\` has been disabled in this guild and cannot be used.`);
  message.channel.send(embed);
};

module.exports.globalyDisabled = (client, message, cmd, reason) => {
  const embed = new RichEmbed()
    .setColor('RED')
    .setDescription(`${client.emotes.x} The command \`${cmd}\` has been disabled by the bot developer.\n\n**Reason:** \`${reason}\``);
  message.channel.send(embed);
};

module.exports.notDev = (client, message, error) => {
  const embed = new RichEmbed()
    .setColor('RED')
    .setTitle(`${client.emotes.x} This command can only be ran by the bot developer.`);
  message.channel.send(embed);
};
