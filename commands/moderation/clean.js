const Command = require('../base/command.js');
const { RichEmbed } = require("discord.js");

class Clean extends Command {
    constructor(client) {
        super(client, {
            name: 'clean',
            category: 'moderation',
            description: 'Prunes the last `x` amount of message sent by the bot in the current channel.',
            usage: '{prefix}clean <2-100>',
            parameters: 'integerNumber',
            extended: false,
            enabled: true,
            reason: null,
            guildOnly: true,
            devOnly: false,
            permission: 'MANAGE_MESSAGES',
            cooldown: 5,
            aliases: []
        });
    };

    async run(message, args) {
        const { prefix } = this.client.settings.get(message.guild.id);
        if (!message.member.permissions.has('MANAGE_MESSAGES')) return this.client.permsError.member(this.client, message, 'MANAGE_MESSAGES');
        if (!message.guild.me.permissions.has('MANAGE_MESSAGES')) return this.client.permsError.self(this.client, message, 'MANAGE_MESSAGES');
        if (!args[0]) return this.client.usage(message, prefix, 'clean');
        const amount = args[0];
        if (amount < 2 || amount > 100 || isNaN(parseInt(amount))) return this.client.argsError(this.client, message, 'Invalid number inputted.');
        await message.delete();
        message.channel.fetchMessages({
            limit: 100,
        }).then(async (messages) => {
            const msgs = messages.filter(m => m.author.id === this.client.user.id).array().slice(0, amount)
            try {
                await message.channel.bulkDelete(msgs);
            } catch (e) {
                return message.channel.send(`${this.client.emotes.x} Error pruning: \`${e.message}\``);
            };
        });
        return message.channel.send(`${this.client.emotes.check} Successfully deleted **${amount}** messages from the bot.`).then(m => m.delete(5000));
    };
};

module.exports = Clean;
