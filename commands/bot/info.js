const { RichEmbed, version } = require('discord.js');
const duration = require('moment-duration-format');
module.exports.run = async (client, message, args) => {
  const uptime = client.moment.duration(client.uptime).format(' D [days], H [hrs], m [mins], s [secs]');
  const nodev = process.version;
  const guilds = client.guilds.size;
  const users = client.users.size;
  const channels = client.channels.size;
  let cmds;
  cmds = client.commands.bot.length;
  cmds = cmds + client.commands.moderation.length;
  cmds = cmds + client.commands.admin.length;
  cmds = cmds + client.commands.utility.length;
  cmds = cmds + client.commands.fun.length;
  cmds = cmds + client.commands.developer.length;
  cmds = cmds + client.commands.misc.length;
  client.fetchUser("312358298667974656").then(u => {
    const embed = new RichEmbed()
      .setColor(client.color)
      .setAuthor(client.user.username, client.user.displayAvatarURL)
      .addField('Developer', `${u.tag} \`(${u.id})\``, true)
      .addField('Developed On', `${client.moment('December 23, 2017').format('dddd, MMMM Do, YYYY')}, 4:56:43 PM (${client.moment('December 23, 2017').fromNow()})`, true)
      // .addField('Packages Used in the client', `\`\`\`${packages}\`\`\``)
      .addField(`Node.js Version`, nodev, true)
      .addField(`Language`, 'JavaScript', true)
      .addField('Library', `discord.js (\`v${version}\`)`, true)
      .addField('Total Guilds', guilds, true)
      .addField('Total Channels', channels, true)
      .addField('Total Users', users, true)
      .setDescription(`**» Current Uptime:** ${uptime}\n**» Total Commands:** ${cmds}`)
      .setFooter(`Utilidex | Developed by ${u.username}`, u.displayAvatarURL)
    return message.channel.send(embed);
  });
};

module.exports.conf = {
  enabled: true,
  reason: null,
  permission: 'SEND_MESSAGES',
  devOnly: false
};

module.exports.help = {
  name: "info",
  category: "bot",
  description: "View information about the bot.",
  usage: "[prefix]info",
  parameters: "None",
  extended: false
};
