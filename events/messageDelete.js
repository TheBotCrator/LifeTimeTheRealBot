const { RichEmbed } = require('discord.js');

module.exports = async (client, message) => {
    const { msgLog } = client.settings.get(message.guild.id);
    const logChannel = message.guild.channels.find(c => c.name === msgLog) || message.guild.channels.get(msgLog);
    if (!logChannel) return;
    if (!message.content) return;
    const time = client.moment().format('dddd, MMMM Do, YYYY, hh:mm:ss A');
    if (!message.guild.me.permissions.has('VIEW_AUDIT_LOG')) {
        if (client.embedPerms(message) === false) {
            return logChannel.send(`A message sent by \`${message.author.tag}\` was deleted in ${message.channel}\`\`\`${message.content}\`\`\`> Time: __\`${time}\`__`);
        } else {
            const embed = new RichEmbed()
                .setColor('RED')
                .setAuthor(message.author.username, message.author.displayAvatarURL)
                .setDescription(`A message sent by \`${message.author.tag}\` was deleted in ${message.channel}\``)
                .addField('Message Content', `\`\`\`${message.content}\`\`\``)
                .setFooter(time);
            return logChannel.send(embed);
        };
    } else {
        const audit = await message.guild.fetchAuditLogs({ type: 'MESSAGE_DELETE' }).then(a => a.entries.first());
        if (client.embedPerms(message) === false) {
            return logChannel.send(`A message sent by \`${message.author.tag}\` was deleted in ${message.channel}. (Deleted by \`${audit.executor.tag}\`)\`\`\`${message.content}\`\`\`> Time: __\`${time}\`__`);
        } else {
            if (audit.executor.id === message.author.id) {
                const embed = new RichEmbed()
                    .setColor('RED')
                    .setAuthor(message.author.username, message.author.displayAvatarURL)
                    .setDescription(`A message sent by \`${message.author.tag}\` was deleted in ${message.channel}\``)
                    .addField('Message Content', `\`\`\`${message.content}\`\`\``)
                    .setFooter(time);
                return logChannel.send(embed);
            } else {
                const embed = new RichEmbed()
                    .setColor('RED')
                    .setAuthor(message.author.username, message.author.displayAvatarURL)
                    .setDescription(`A message sent by \`${message.author.tag}\` was deleted in ${message.channel}`)
                    .addField('Message Content', `\`\`\`${message.content}\`\`\``)
                    .setFooter(`Deleted by: ${audit.executor.tag} • ${time}`);
                return logChannel.send(embed);
            };
        };
    };
};