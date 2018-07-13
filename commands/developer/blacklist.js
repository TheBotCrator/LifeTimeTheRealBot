//block users from using the $bug, $suggest, and $feedback commands
const { RichEmbed } = require("discord.js");
// let notDev = require('../functions/roleExists.js');
// notDev = notDev.notDev;

module.exports.run = async (client, message, args) => {
    return message.reply('LMAO');
    if (message.author.id !=='312358298667974656') return notDev();
    switch (args[0]) {
        case 'add':
        {
            let member = message.mentions.members.first().id;
            if (!member) member = args[1]
            if (client.blacklist.includes(member)) return message.channel.send(`${client.emotes.x} That user is already blacklisted.`);
            await client.blacklist.push(member);
            return message.channel.send(`${client.emotes.check} That user has been blacklisted from using bot commands.`);
        };
        break;
        case 'remove':
        {
                let member = message.mentions.members.first();
                if (member) member = member.id;
                if (!member) member = args[1]
            if (!client.blacklist.includes(member)) return message.channel.send(`${client.emotes.x} That user is not blacklisted.`);
            let index = client.blacklist.indexOf(member);
            await client.blacklist.splice(index, 1);
            return message.channel.send(`${client.emotes.check} That user can use bot commands again.`);
        };
        break;
        case 'list':
        {
            return message.channel.send(`\`\`\`[${client.blacklist.join(', ')}]\`\`\``);
        };
        break;
        default:
        {

        };
    };
};

module.exports.conf = {
    enabled: true,
    reason: null,
    permission: 'SEND_MESSAGES',
    devOnly: true
};

module.exports.help = {
    name: 'blacklist',
    category: 'developer',
    description: 'List, remove, or add someone to be blacklisted from using the client\'s commands',
    usage: '[prefix]blacklist <view|add|remove> <@user|user ID(if applicable)>',
    parameters: 'stringFlag, snowflakeUser'
};
