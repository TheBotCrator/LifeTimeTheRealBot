const Command = require('../base/command.js');
const { RichEmbed } = require('discord.js');

class RPS extends Command {
  constructor(client) {
    super(client, {
      name: 'rps',
      category: 'fun',
      description: 'Play a game of RPS with the bot.',
      usage: '{prefix}rps <choice>',
      parameters: 'stringChoice',
      extended: false,
      enabled: true,
      reason: null,
      guildOnly: false,
      devOnly: false,
      cooldown: 3,
      aliases: ['rockpaper', 'rockpaperscissors']
    });
  };

  async run(message, args) {
    const { prefix } = this.client.settings.get(message.guild.id);
    let choice = ['rock', 'paper', 'scissors'];
    choice = choice[Math.floor(Math.random() * choice.length)];
    if (!args[0]) return this.client.usage(message, prefix, 'rps');
    const str = args[0].toLowerCase();
    const msgSequence = async (color, msg) => {
      const choice = new RichEmbed()
        .setColor(color)
        .setDescription(msg);
      message.channel.send(choice);
    };
    switch (str) {
      case 'rock':
        {
          if (choice === 'rock') {
            return msgSequence('GOLD', 'Rock, tie!');
          } else if (choice === 'paper') {
            return msgSequence('RED', 'Paper, I win!');
          } else if (choice === 'scissors') {
            return msgSequence('GREEN', 'Scissors, you win!')
          };
        };
        break;
      case 'paper':
        {
          if (choice === 'rock') {
            return msgSequence('GREEN', 'Rock, you win!');
          } else if (choice === 'paper') {
            return msgSequence('GOLD', 'Paper, tie!');
          } else if (choice === 'scissors') {
            return msgSequence('RED', 'Scissors, I win!')
          };
        };
        break;
      case 'scissors':
        {
          if (choice === 'rock') {
            return msgSequence('RED', 'Rock, I win!');
          } else if (choice === 'paper') {
            return msgSequence('GREEN', 'Paper, you win!');
          } else if (choice === 'scissors') {
            return msgSequence('GOLD', 'Scissors, tie!')
          };
        };
        break;
      default:
        {
          const embed = new RichEmbed()
            .setColor(this.client.color)
            .setDescription(`\`${args[0]}\`!? This game is called rock, paper, scissors for a reason!`);
          return message.channel.send(embed);
        };
    }; 
  };
};

module.exports = RPS;
