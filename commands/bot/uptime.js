const { RichEmbed } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

module.exports.run = async (client, message, args) => {
    const uptime = moment.duration(client.uptime).format(' D [days], H [hrs], m [mins], s [secs]');
    const embed = new RichEmbed()
        .setColor(client.color)
        .setAuthor(client.user.username, client.user.displayAvatarURL)
        .setTitle('Bot Uptime')
        .setDescription(`The bot has been online for **${uptime}**`);
    return message.channel.send(embed);
};

module.exports.conf = {
    enabled: true,
    reason: null,
    permission: 'SEND_MESSAGES',
    devOnly: false 
};

module.exports.help = {
    name: 'uptime',
    category: 'bot',
    description: 'Displays how long the bot has been online since its last restart.',
    usage: '[prefix]uptime',
    parameters: 'None',
    extended: false
};