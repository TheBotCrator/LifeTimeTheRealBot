const { RichEmbed } = require('discord.js');
const urban = require('urban');

module.exports.run = async (client, message, args) => {
  const { prefix } = client.settings.get(message.guild.id);
  if (!args[0]) return client.usage(message, prefix, 'urban');
  if (!message.channel.nsfw) return message.delete(), message.channel.send(`${client.emotes.x} Due to restrictions, this command can only be ran in marked NSFW channels.`);
  if (args[0].toLowerCase() === '-random') {
      urban.random().first(json => {
          let example = json.example;
          let upvotes = json.thumbs_up;
          let downvotes = json.thumbs_down;
          let author = json.author;
          let def = json.definition;
          let link = json.permalink;
          if (example.length < 1) {
              example = 'None.';
          };
          if (upvotes < 1) {
              upvotes = 'None.';
          };
          if (downvotes < 1) {
              downvotes = 'None.';
          };
          if (author.length < 1) {
              author = 'None.';
          };
          if (def.length < 1) {
              def = 'None.';
          };
          if (link.length < 1) {
              link = 'None';
          };
          const embed = new RichEmbed()
              .setColor(message.guild.me.highestRole.hexColor)
              .setTitle(`Urban Dictionary results for ${json.word}`)
              .setDescription(`**${def}**\n\nLink: **${link}**`)
              .addField('Examples', example)
              .addField(`👍Upvotes`, upvotes, true)
              .addField(`👎Downvotes`, downvotes, true)
              .setFooter(`Written by ${author} | Requested by ${message.author.username}`, message.author.displayAvatarURL);
          message.channel.send('Searching...').then(m => setTimeout(function () {
              m.edit(embed);
          }, (1000)));
          return;
          });
  }else{
      const str = args.join(' ');
      urban(str).first(json => {
          if (!json) {
              message.channel.send('Searching...').then(m => setTimeout(function() {
                  m.edit('No results found.');
              }, (1000)));
          return;
          };//end if
          let example = json.example;
          let upvotes = json.thumbs_up;
          let downvotes = json.thumbs_down;
          let author = json.author;
          let def = json.definition;
          let link = json.permalink;
          if (example.length < 1) {
              example = 'None.';
          };
          if (upvotes < 1) {
              upvotes = 'None.';
          };
          if (downvotes < 1) {
              downvotes = 'None.';
          };
          if (author.length < 1) {
              author = 'None.';
          };
          if (def.length < 1) {
              def = 'None.';
          };
          if (link.length < 1) {
              link = 'None';
          };
          const embed = new RichEmbed()
              .setColor(message.guild.me.highestRole.hexColor)
              .setTitle(`Urban Dictionary results for ${str}`)
              .setDescription(`**${def}**\n\nLink: **${link}**`)
              .addField('Examples', example)
              .addField(`👍Upvotes`, upvotes, true)
              .addField(`👎Downvotes`, downvotes, true)
              .setFooter(`Written by ${author} | Requested by ${message.author.username}`, message.author.displayAvatarURL);
          message.channel.send('Searching...').then(m => setTimeout(function() {
              m.edit(embed);
          }, (1000)));
          return;
      });//end function
  };//end else
};

module.exports.conf = {
  enabled: true,
  reason: null,
  permission: 'SEND_MESSAGES',
  devOnly: false
};

module.exports.help = {
  name: "urban",
  category: "bot",
  description: "Look up a term in the urban dictionary.",
  usage: "[prefix]urban <text|-random>",
  parameters: "stringTex",
  extended: 'For a random result, just type `-random` after the command.'
};
