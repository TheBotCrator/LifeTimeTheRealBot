const { RichEmbed } = require('discord.js');

module.exports.member = (client, message, perm) => {
    const embed = new RichEmbed()
      .setColor('RED')
      .addField(`${client.emotes.x} Permissions Error`, `\`You lack the permission \`__\`${perm} \`__\`to run this command.\``);
    message.delete(), message.channel.send(embed);
};

module.exports.self = (client, message, perm) => {
    const embed = new RichEmbed()
      .setColor('RED')
  .addField(`${client.emotes.x} Permissions Error`, `\`The bot lacks the permission \`__\`${perm} \`__\`to execute this command.\``)
    message.delete(), message.channel.send(embed);
};
