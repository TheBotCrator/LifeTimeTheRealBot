const { RichEmbed, Util } = require('discord.js');

module.exports.run = async (client, message, args) => {
  const { prefix } = client.settings.get(message.guild.id);
  if (!args[0]) return client.usage(message, prefix, 'search');
  const results = await client.YouTube.searchVideos(args.join(' '), 5);
  if (!results.length < 1) return message.channel.send(`${client.emotes.x} Couldn't find any videos for that search string.`);
//  const map = videos.map(v => `🎧 ${videos.map(i => `${i.title}\n🔗 https://www.youtube.com/watch?v=${i.id}\n`).join("\n🎧 ")}`);
  const embed = new RichEmbed()
    .setColor('RED')
    .setAuthor(message.guild.name, message.guild.iconURL)
    .setDescription(`Top 5 Results for '**${args.join(' ')}**'\n\n🎧 ${results.map(i => `${i.title}\n🔗 https://www.youtube.com/watch?v=${i.id}\n`).join("\n🎧 ")}`);
  return message.channel.send(embed);
};

module.exports.conf = { enabled: true};
module.exports.help = {};
