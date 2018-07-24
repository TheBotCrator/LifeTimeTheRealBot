const { RichEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
    const createdAt = `${client.moment(message.guild.createdAt).format('dddd, MMMM Do, YYYY, hh:mm:ss A')} (${client.moment(message.guild.createdAt).fromNow()})`;
    const textChan = message.guild.channels.filter(c => c.type === 'text').size;
    const voiceChan = message.guild.channels.filter(c => c.type === 'voice').size;
    const categories = message.guild.channels.filter(c => c.type === 'category').size;
    const roles = message.guild.roles.size > 1 ? `\`\`\`${message.guild.roles.map(r => r.name).slice(1).join(' | ')}\`\`\`` : 'No Roles';
    const emotes = message.guild.emojis.size > 0 ? (message.guild.emojis.size < 25 ? message.guild.emojis.map(e => e).join(' ') : 'Too many emotes to show.') : 'No emotes';
    const embed = new RichEmbed()
        .setColor(client.color)
        .setAuthor(message.guild.name, message.guild.iconURL)
        .setDescription(`» Owner: **${message.guild.owner.user.tag}** (\`${message.guild.owner.user.id}\`)`)
        .addField('Guild Name', message.guild.name, true)
        .addField('Guild ID', message.guild.id, true)
        .addField('Created On', createdAt, true)
        .addField('Text Channels', textChan)
        .addField('Categories', categories, true)
        .addField('Voice Channels', voiceChan, true)
        .addField('Custom Emotes', emotes)
        .addField('Member Count (All)', message.guild.members.size, true)
        .addField('Member Count (Bots)', message.guild.members.filter(m => m.user.bot).size, true)
        .addField(`Server Roles [${message.guild.roles.size}]`,  roles)
        .setImage(message.guild.iconURL)
        .setFooter(`Requested By ${message.author.username}`, message.author.displayAvatarURL)
    return message.channel.send(embed);
};

module.exports.conf = {
    enabled: true,
    reason: null,
    permission: 'SEND_MESSAGES',
    devOnly: false
};

module.exports.help = {
    name: 'guild',
    category: 'utility',
    description: 'Returns information for the current guild.',
    usage: '[prefix]guild',
    parameters: 'None',
    extended: false
};
