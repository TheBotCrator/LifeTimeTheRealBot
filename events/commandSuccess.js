const { RichEmbed, Util } = require('discord.js');

class CommandSuccess {
    constructor(client) {
        this.client = client;
    };

    async run(message) {
        const cmd = message.content.split(' ')[0].slice(this.client.settings.get(message.guild.id).prefix.length);
        const guild = `${message.guild.name} (\`${message.guild.id}\`)`;
        const user = `${message.author.tag} (\`${message.author.id}\`)`;
        const content = Util.escapeMarkdown(message.content);
        const embed = new RichEmbed()
            .setColor('GREEN')
            .setDescription(`> **Guild:** ${guild}\n> **User:** ${user}\n> **Command:** \`${cmd}\`\n\`\`\`${content}\`\`\``)
            .setFooter(this.client.moment(message.createdAt).format('dddd, MMMM Do, YYYY, hh:mm:ss A'));
        this.client.channels.get('472271506496552998').send(embed);
    };
};

module.exports = CommandSuccess;
