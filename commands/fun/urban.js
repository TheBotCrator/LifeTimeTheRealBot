const Command = require('../base/command.js');
const { RichEmbed } = require('discord.js');
const urban = require('urban');
const URL = "https://lh3.googleusercontent.com/4hpSJ4pAfwRUg-RElZ2QXNh_pV01Z96iJGT2BFuk_RRsNc-AVY7cZhbN2g1zWII9PBQ=h300";

class Urban extends Command {
    constructor(client) {
        super(client, {
            name: 'urban',
            category: 'fun',
            description: 'Search a term in the urban dictionary, or use the `-random` flag to return a random term.',
            usage: '{prefix}urban <-random|term>',
            parameters: 'stringFlag, stringTerm',
            extended: false,
            enabled: true,
            reason: null,
            guildOnly: false,
            devOnly: false,
            cooldown: 5,
            aliases: []
        });
    };

    async run(message, args) {
        const { prefix } = this.client.settings.get(message.guild.id);
        if (!args[0]) return this.client.usage(message, prefix, 'urban');
        if (!message.channel.nsfw) {
            return message.delete(), message.channel.send(`${client.emotes.x} Due to restrictions, this command can only be ran in marked NSFW channels.`);
        };
        if (message.content.includes('-') && message.content.split('-')[1].toLowerCase() === 'random') {
            urban.random().first((json) => {
                let example = json.example;
                let upvotes = json.thumbs_up;
                let downvotes = json.thumbs_down;
                let author = json.author;
                let definition = json.definition;
                let link = json.permalink;
                if (example.length < 1) example = 'No example provided.';
                if (definition.length > 2048) definition = 'Definition is too long to display - try again.';
                const embed = new RichEmbed()
                    .setColor(this.client.color)
                    .setAuthor(author, URL, link)
                    .setDescription(definition)
                    .addField('Examples', example)
                    .addField('Votes', `\\👍${upvotes} | \\👎${downvotes}`)
                    .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL);
                return message.channel.send(embed);
            });
        } else if (!message.content.includes('-')) {
            let str = args.join(' ');
            urban(str).first(json => {
                console.log('wtf do u want')
                if (!json) return message.channel.send(`${this.client.emotes.x} No results found.`);
                let example = json.example;
                let upvotes = json.thumbs_up;
                let downvotes = json.thumbs_down;
                let author = json.author;
                let definition = json.definition;
                let link = json.permalink;
                if (example.length < 1) example = 'No example provided.';
                if (definition.length > 2048) definition = 'Definition is too long to display - try again.';
                const embed = new RichEmbed()
                    .setColor(this.client.color)
                    .setAuthor(author, URL, link)
                    .setDescription(definition)
                    .addField('Examples', example)
                    .addField('Votes', `👍${upvotes} | 👎${downvotes}`)
                    .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL);
                return message.channel.send(embed);
            });  
        };
    };
};

module.exports = Urban;
