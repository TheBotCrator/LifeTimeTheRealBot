const { RichEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
    const { prefix } = client.settings.get(message.guild.id);
    if (!args[0]) return client.usage(message, prefix, '8ball');
    const answer = ["Yes.", "No.", "Maybe?", "100%", "System overload: Ask again.", "Cannot predict now.", "¯\\_(ツ)_/¯", ":shrug:", "I'm a bot, don't ask me.", "Oh..am I supposed to answer that?", "I'm hearing yes...no..so..maybe.", "Turtles.", ":zzz: bot too tired to answer.", ":unamused: Dumb question.", "Concentrate and ask again."];
    const a = answer[Math.floor(Math.random() * answer.length)];
    const q = args.join(' ');
    if (!q.endsWith('?')) return message.delete(), message.channel.send(`${client.emotes.x} Hmm..that doesn't look like a question!`);
    const embed = new RichEmbed()
        .setColor(message.member.highestRole.hexColor)
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        .setThumbnail("http://icons.iconarchive.com/icons/barkerbaggies/pool-ball/256/Ball-8-icon.png")
        .addField("Question", q)
        .addField("Answer", a);
    message.channel.send("<a:thinkRotate:435311093879930880>").then(m => setTimeout(function() {
        m.edit(embed);
    }, (1000)));
};

module.exports.conf = {
    enabled: true,
    reason: null,
    permission: 'SEND_MESSAGES',
    devOnly: false
};

module.exports.help = {
    name: "8ball",
    category: "fun",
    description: "Ask the all mighty 8ball the toughest of life's questions!.",
    usage: "[prefix]8ball <question>",
    parameters: "stringQuestion",
    extended: false
};
