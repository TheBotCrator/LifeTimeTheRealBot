const { RichEmbed } = require('discord.js');

module.exports = (client, message, arg) => {
  const embed = new RichEmbed()
    .setColor('GOLD')
    .setDescription(`${client.emotes.warn} ${arg}`);
  message.delete(), message.channel.send(embed);
};
