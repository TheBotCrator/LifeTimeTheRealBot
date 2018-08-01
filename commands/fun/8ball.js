const Command = require('../base/command.js');
const { RichEmbed } = require("discord.js");

class EightBall extends Command {
    constructor(client) {
        super(client, {
            name: '8ball',
            category: 'fun',
            description: 'Ask the all-mighty 8ball all of life\'s tougest questions.',
            usage: '{prefix}8ball <question>',
            parameters: 'stringQuestion',
            extended: false,
            enabled: true,
            reason: null,
            guildOnly: false,
            devOnly: false,
            permission: 'SEND_MESSAGES',
            cooldown: 5,
            aliases: ['8b']
        });
    };

    async run(message, args) {
        const { prefix } = this.client.settings.get(message.guild.id);
        if (!args[0]) return this.client.usage(message, prefix, '8ball');
        const answer = ["Yes.", "No.", "Maybe?", "100%", "System overload: Ask again.", "Cannot predict now.", "¯\\_(ツ)_/¯", ":shrug:", "I'm a bot, don't ask me.", "Oh..am I supposed to answer that?", "I'm hearing yes...no..so..maybe.", "Turtles.", ":zzz: bot too tired to answer.", ":unamused: Dumb question.", "Concentrate and ask again."];
        const a = answer[Math.floor(Math.random() * answer.length)];
        const q = args.join(' ');
        if (!q.endsWith('?')) return message.delete(), message.channel.send(`${this.client.emotes.x} Hmm..that doesn't look like a question!`);
        const embed = new RichEmbed()
            .setColor(this.client.color)
            .setAuthor(message.author.username, message.author.displayAvatarURL)
            .setThumbnail("http://icons.iconarchive.com/icons/barkerbaggies/pool-ball/256/Ball-8-icon.png")
            .addField("Question", q)
            .addField("Answer", a);
        message.channel.send("<a:thinkRotate:474038916425449474>").then(m => setTimeout(function () {
            m.edit(embed);
        }, (1000)));
    };
};

module.exports = EightBall;
