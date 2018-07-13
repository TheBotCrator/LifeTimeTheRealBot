const { RichEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
  const notDev = new RichEmbed()
    .setColor('RED')
    .setTitle(`${client.emotes.x} This command can only be ran by the bot developer.`);
    if (message.author.id !== '312358298667974656') return message.delete(), message.channel.send(notDev)
    if (!args[0]) return;
    const content = message.content.split(' ').slice(1).join(' ');
    const result = new Promise((resolve, reject) => resolve(eval(content)));
    return result.then(async output => {
        if (typeof output !== 'string') output = require('util').inspect(output, {
            depth: 0
        });
        if (output.includes(process.env.TOKEN)) output = output.replace(process.env.TOKEN, '[TOKEN]');
        let toolong = new RichEmbed()
            .setColor("GOLD")
            .setTitle("Eval Success")
            .setDescription(`${client.emotes.warn} **Length too long, check console.**`)
        if (output.length > 1000) return console.log(output), message.channel.send(toolong);
        let success = new RichEmbed()
            .setColor("GREEN")
            .addField(`${client.emotes.check} **Eval Success**`, `\`\`\`${output}\`\`\``)
        return message.channel.send(success)
    }).catch(err => {
        console.error(err);
        err = err.toString();

        if (err.includes(process.env.TOKEN)) err = err.replace(process.env.TOKEN, '[TOKEN]');
        let error = new RichEmbed()
            .setColor("RED")
            .addField(`${client.emotes.x} **Eval Fail**`, `\`\`\`${err}\`\`\``)
        return message.channel.send(error);
    });
};

module.exports.conf = {
  enabled: true
};
