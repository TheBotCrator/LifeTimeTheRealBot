const { RichEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
  const { prefix } = client.settings.get(message.guild.id);
  let invMap;
  const invites = await message.guild.fetchInvites();
  if (client.embedPerms(message) === false) {
    if (invites.size < 1) {
      return message.delete(), message.channel.send(`${client.emotes.warn} \`There are no invite links for this server.\``);
    };
    invMap = invites.map(i => i.code).join('\n');
    return message.channel.send(`There are currently \`${invites.size}\` invites for ${message.guild.name}\n\`\`\`${invMap}\`\`\`You can do \`${prefix}invite <invite code>\` for more information on an invite.`);
  } else {
    if (invites.size < 1) return client.argsError(client, message, 'There are not invite links for this server.');
    invMap = invites.map(i => i.code).join('\n');
    const embed = new RichEmbed()
      .setColor(message.guild.me.highestRole.hexColor)
      .setAuthor(message.guild.name, message.guild.iconURL)
      .addField(`There are currently ${invites.size} invites for ${message.guild.name}`, `\`\`\`${invMap}\`\`\``)
      .setFooter(`You can do ${prefix}invite <invite code> for more information on an invite.`);
    return message.channel.send(embed);
  };
};

module.exports.conf = {
  enabled: true,
  reason: null,
  permission: 'SEND_MESSAGES',
  devOnly: false
};
