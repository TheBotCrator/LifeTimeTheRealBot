const { RichEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
  const { prefix } = client.settings.get(message.guild.id);
  let choice = ['rock', 'paper', 'scissors'];
  choice = choice[Math.floor(Math.random() * choice.length)];
  if (!args[0]) return client.usage(message, prefix, 'rps');
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
          .setColor(client.color)
          .setDescription(`\`${args[0]}\`!? This game is called rock, paper, scissors for a reason!`);
      return message.channel.send(embed);
    };
  };
};

module.exports.conf = {
  enabled: true,
  reason: null,
  permission: 'SEND_MESSAGES',
  devOnly: false
};

module.exports.help = {
  name: 'rps',
  category: 'fun',
  description: 'Play a game of rock, paper, scissors with the bot.',
  usage: '[prefix]rps <rock|paper|scissors>',
  parameters: 'stringChoice',
  extended: false
};
