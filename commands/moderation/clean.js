const { RichEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
    const { prefix } = client.settings.get(message.guild.id);
    if (!message.member.permissions.has('MANAGE_MESSAGES')) return client.permsError.member(client, message, 'MANAGE_MESSAGES');
    if (!message.guild.me.permissions.has('MANAGE_MESSAGES')) return client.permsError.self(client, message, 'MANAGE_MESSAGES');
    if (!args[0]) return client.help(message, prefix, 'clean');
    const amount = args[0];
    if (amount < 1 || amount > 100 || isNaN(parseInt(amount))) {
        message.delete();
        return message.channel.send(`${client.emotes.x} Incorrect input provided.`);
    };
    await message.delete();
    message.channel.fetchMessages({
        limit: 100,
    }).then(async (messages) => {
        const msgs = messages.filter(m => m.author.id === client.user.id).array().slice(0, amount)
        try {
            await message.channel.bulkDelete(msgs);
        }catch(e){
            return message.channel.send(`${client.emotes.x} Error pruning: \`${e.message}\``);
        };
    });
    return message.channel.send(`${client.emotes.check} Successfully deleted **${amount}** messages from the bot.`).then(m => m.delete(5000));
};

module.exports.conf = {
    enabled: true,
    reason: null,
    permission: 'MANAGE_MESSAGES',
    devOnly: false
};

module.exports.help = {
    name: "clean",
    category: "MODERATION",
    description: "Deletes the last `x` amount of messages sent by the bot in the current channel.",
    usage: "[prefix]clean <number>",
    parameters: "integerNumber",
    extended: false
};
