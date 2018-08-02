const Command = require('../base/command.js');
const { RichEmbed } = require('discord.js');

class Case extends Command {
    constructor(client) {
        super(client, {
            name: 'case',
            category: 'moderation',
            description: 'Retrieves case details for a moderation case.',
            usage: '{prefix}case <case #>',
            parameters: 'integerCaseNumber',
            extended: false,
            enabled: true,
            reason: null,
            guildOnly: true,
            devOnly: false,
            permission: 'KICK_MEMBERS',
            cooldown: 3,
            aliases: []
        });
    };

    async run(message, args) {
        const { prefix, modLog } = this.client.settings.get(message.guild.id);
        if (!message.member.permissions.has('KICK_MEMBERS')) return this.lient.permsError.member(this.client, message, 'KICK_MEMBERS');
        if (!args[0]) return this.client.usage(message, prefix, 'case');
        const caseNum = args[0];
        const log = message.guild.channels.find(c => c.name === modLog) || message.guild.channels.get(modLog);
        if (!log) return message.delete(), message.channel.send(`${this.client.emotes.x} Error retrieving data: \`NO MODLOG CHANNEL FOUND\``);
        await log.fetchMessages({ limit: 100 }).then(messages => {
            const caseLog = messages.filter(m => m.author.id === this.client.user.id &&
                m.embeds[0] &&
                m.embeds[0].type === 'rich' &&
                m.embeds[0].footer &&
                m.embeds[0].footer.text.includes(`Case #${caseNum}`)
            ).first();
            if (!caseLog) return message.channel.send(`${this.client.emotes.x} Error retrieving data: \`NO CASE FOUND\``);
            log.fetchMessage(caseLog.id).then(msg => {
                const caseEmbed = msg.embeds[0];
                const color = caseEmbed.color;
                const moderator = caseEmbed.description.split('by')[1];
                const aUser = caseEmbed.author.name.split('|')[0];
                const type = caseEmbed.author.name.split('|')[1];
                const user = caseEmbed.description.split('**')[1];
                const av = caseEmbed.author.iconURL
                const time = caseEmbed.footer.text.split('|')[1];
                const reason = caseEmbed.fields[0].value;
                const embed = new RichEmbed()
                    .setColor(color)
                    .setAuthor(aUser, av)
                    .setTitle(`Case #${caseNum}`)
                    .addField('User', user)
                    .addField('Moderator', moderator)
                    .addField('Reason', reason)
                    .addField('Timestamp', time)
                    .setFooter(`Type: ${type.toUpperCase()}`);
                return message.channel.send(embed);
            });
        });
    };
};

module.exports = Case;
