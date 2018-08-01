const Command = require('../base/command.js');
const { RichEmbed } = require('discord.js');

class Bans extends Command {
    constructor(client) {
        super(client, {
            name: 'bans',
            category: 'utility',
            description: 'Retrieves all of the current bans for your server.',
            usage: '{prefix}bans',
            parameters: 'None',
            extended: false,
            enabled: true,
            reason: null,
            guildOnly: true,
            devOnly: false,
            cooldown: 5,
            aliases: [],
            permission: 'SEND_MESSAGES'
        });
    };
    
    async run(message, args) {
        const bans = await message.guild.fetchBans();
        if (bans.size < 1) return message.channel.send(`${this.client.emotes.x} It seems no one is banned on this server.`);
        const ban_map = bans.map(u => `${u.username}#${u.discriminator} (${u.id})`).join('\n');
        const embed = new RichEmbed()
            .setColor(this.client.color)
            .setAuthor(message.guild.name, message.guild.iconURL)
            .setDescription(`» Displaying **${bans.size}** bans for ${message.guild.name}\`\`\`${ban_map}\`\`\``);
        return message.channel.send(embed);
    };
};

module.exports = Bans;
