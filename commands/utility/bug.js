const {
  RichEmbed
} = require("discord.js");

module.exports.run = async (client, message, args) => {
  const {
    prefix
  } = client.settings.get(message.guild.id);
  if (!args[0]) return client.usage(message, prefix, 'bug');
  const msg = args.join(' ');
  if (msg.length < 30) return message.delete(), message.channel.send(`${client.emotes.x} Please make your bug report more than 30 characters. Be sure to include as much detail as you can!`);
  const embed = new RichEmbed()
    .setColor('RED')
    .setAuthor(`${message.author.username} (${message.author.id})`, message.author.displayAvatarURL)
    .setTitle('New Bug Report')
    .setDescription(`A new bug report has been sent in by **${message.author.tag}**:\n\`\`\`${msg}\`\`\``)
    .setFooter(`Sent from ${message.guild.name} (${message.guild.id})`, message.guild.iconURL)
    .setTimestamp()
  await client.channels.get('455174684066185216').send(embed);
  return message.delete(), message.channel.send(`${client.emotes.check} Thank you for your bug report! It has been sent to the bot developer to review.`).then(m => m.delete(15000));
};

module.exports.conf = {
  enabled: true,
  reason: null,
  permission: 'SEND_MESSAGES',
  devOnly: false
};

module.exports.help = {
  name: 'bug',
  category: 'UTILITY',
  description: 'Sends a new bug report for the bot developer to review.',
  usage: '[prefix]bug <bug report> (provide as much detail as you can!)',
  parameters: 'stringReport',
  extended: false
};