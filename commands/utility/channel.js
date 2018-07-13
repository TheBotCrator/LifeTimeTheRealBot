const { RichEmbed } = require("discord.js");
const moment = require("moment");

module.exports.run = async (client, message, args) => {
        let channel;
        if (!args[0]) channel = message.channel;
        if (args[0]) channel = message.mentions.channels.first() || message.guild.channels.find('name', args.join(' ')) || message.guild.channels.get(args[0]);
        if (!channel) return message.channel.send(`${client.emotes.x} Hmm..that channel doesn't exist.`);
        const name = channel.name;
        const id = channel.id;
        let nsfw = channel.nsfw ? client.emotes.check : client.emotes.x;
        let topic = channel.topic ? channel.topic : 'no topic set.';
        let type = channel.type;
        let catName = channel.parent.name;
        let position = channel.position;
        let created = `${moment(channel.createdAt).format('dddd, MMMM Do, YYYY, hh:mm:ss A')} (${moment(channel.createdAt).fromNow()}`;
        const embed = new RichEmbed()
            .setColor(message.guild.me.highestRole.hexColor)
            .setDescription(`» Created on ${created}`)
            .setAuthor(message.guild.name, message.guild.iconURL)
            .addField('Channel Name', name, true)
            .addField('Channel ID', id, true)
            .addField('NSFW?', nsfw, true)
            .addField('Topic', `\`\`\`${topic}\`\`\``)
            .addField('Category Name', catName, true)
            .addField('Channel Type', type, true)
            .addField('Channel Position', position, true)
        return message.channel.send(embed);
};
module.exports.conf = {
    enabled: true,
    reason: null,
    permission: 'SEND_MESSAGES',
    devOnly: false
};

module.exports.help = {
  name: 'channel',
  category: 'UTILITY',
  description: 'Returns information about a channel on the guild.',
  usage: '[prefix]channel <#channel|channel name|channel ID>',
  parameters: 'snowflakeGuildChannel',
  extended: false
};
