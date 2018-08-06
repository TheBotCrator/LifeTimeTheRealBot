const Command = require('../base/command.js');
const { RichEmbed } = require('discord.js');

class Prune extends Command {
  constructor(client) {
    super(client, {
      name: 'prune',
      category: 'moderation',
      description: 'Prunes the last `x` amount of messages in the current channel. The number of messages to delete must be in between `2` and `1000`',
      usage: '{prefix}prune <number>',
      parameters: 'integerNumber',
      extended: false,
      enabled: true,
      reason: null,
      permission: 'MANAGE_MESSAGES',
      guildOnly: true,
      devOnly: false,
      cooldown: 8,
      aliases: ['purge', 'clear']
    });
  };

  async run(message, args) {
    const { prefix } = this.client.settings.get(message.guild.id);
    if (!message.member.permissions.has('MANAGE_MESSAGES')) return this.client.permsError.member(this.client, message, 'MANAGE_MESSAGES');
    if (!message.guild.me.permissions.has('MANAGE_MESSAGES')) return this.client.permsError.bot(this.client, message, 'MANAGE_MESSAGES');
    if (!args[0]) return this.client.usage(message, prefix, 'prune');
    const num = args[0];
    if (isNaN(parseInt(num))) return this.client.argsError(this.client, message, 'Invalid number specified.\nArgument should be a number between `2` and `1000`.')
    const success = (num) => {
      const embed = new RichEmbed()
        .setColor('GREEN')
        .setDescription(`${this.client.emotes.check} Successfully pruned \`${num}\` messages.`);
      return message.channel.send(embed).then(m => m.delete(5000));
    };
    const reject = (err) => {
      const embed = new RichEmbed()
        .setColor('RED')
        .setDescription(`${this.client.emotes.x} Error Pruning:\n\`${err}\``);
      return message.delete(), message.channel.send(embed);
    }; 6
    if (num < 2 || num > 1000) return reject('Number specified was less than 2 or greater than 1000.');
    await message.delete();
    if (num <= 100) {
      try {
        await message.channel.bulkDelete(num);
        return success(num);
      } catch (e) {
        return reject(e.message);
      };
    } else if (num >= 101 && num <= 200) {
      try {
        await message.channel.bulkDelete(100);
        await message.channel.bulkDelete(num - 100);
        return success(num);
      } catch (e) {
        return reject(e.message);
      };
    } else if (num >= 201 && num <= 300) {
      try {
        await message.channel.bulkDelete(100);
        await message.channel.bulkDelete(100);
        await message.channel.bulkDelete(num - 200);
        return success(num);
      } catch (e) {
        return reject(e.message);
      };
    } else if (num >= 301 && num <= 400) {
      try {
        await message.channel.bulkDelete(100);
        await message.channel.bulkDelete(100);
        await message.channel.bulkDelete(100);
        await message.channel.bulkDelete(num - 300);
        return success(num);
      } catch (e) {
        return reject(e.message);
      };
    } else if (num >= 401 && num <= 500) {
      try {
        await message.channel.bulkDelete(100);
        await message.channel.bulkDelete(100);
        await message.channel.bulkDelete(100);
        await message.channel.bulkDelete(100);
        await message.channel.bulkDelete(num - 400);
        return success(num);
      } catch (e) {
        return reject(e.message);
      };
    } else if (num >= 501 && num <= 600) {
      try {
        await message.channel.bulkDelete(100);
        await message.channel.bulkDelete(100);
        await message.channel.bulkDelete(100);
        await message.channel.bulkDelete(100);
        await message.channel.bulkDelete(100);
        await message.channel.bulkDelete(num - 500);
        return success(num);
      } catch (e) {
        return reject(e.message);
      };
    } else if (num >= 601 && num <= 700) {
      try {
        await message.channel.bulkDelete(100);
        await message.channel.bulkDelete(100);
        await message.channel.bulkDelete(100);
        await message.channel.bulkDelete(100);
        await message.channel.bulkDelete(100);
        await message.channel.bulkDelete(100);
        await message.channel.bulkDelete(num - 600);
        return success(num);
      } catch (e) {
        return reject(e.message);
      };
    } else if (num >= 701 && num <= 800) {
      try {
        await message.channel.bulkDelete(100);
        await message.channel.bulkDelete(100);
        await message.channel.bulkDelete(100);
        await message.channel.bulkDelete(100);
        await message.channel.bulkDelete(100);
        await message.channel.bulkDelete(100);
        await message.channel.bulkDelete(100);
        await message.channel.bulkDelete(num - 700);
        return success(num);
      } catch (e) {
        return reject(e.message);
      };
    } else if (num >= 801 && num <= 900) {
      try {
        await message.channel.bulkDelete(100);
        await message.channel.bulkDelete(100);
        await message.channel.bulkDelete(100);
        await message.channel.bulkDelete(100);
        await message.channel.bulkDelete(100);
        await message.channel.bulkDelete(100);
        await message.channel.bulkDelete(100);
        await message.channel.bulkDelete(100);
        await message.channel.bulkDelete(num - 800);
        return success(num);
      } catch (e) {
        return reject(e.message);
      };
    } else if (num >= 901 && num <= 1000) {
      try {
        await message.channel.bulkDelete(100);
        await message.channel.bulkDelete(100);
        await message.channel.bulkDelete(100);
        await message.channel.bulkDelete(100);
        await message.channel.bulkDelete(100);
        await message.channel.bulkDelete(100);
        await message.channel.bulkDelete(100);
        await message.channel.bulkDelete(100);
        await message.channel.bulkDelete(100);
        await message.channel.bulkDelete(num - 900);
        return success(num);
      } catch (e) {
        return reject(e.message);
      };
    };
  };
};

module.exports = Prune;
